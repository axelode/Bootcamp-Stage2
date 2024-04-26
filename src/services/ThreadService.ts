import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import cloudinary from "../CloudinaryConfig"
import * as fs from "fs"
import { addThread, updateThread } from "../utils/ThreadUtil"

const prisma = new PrismaClient()

function isValidUUID(uuid: string): boolean {
    const UUIDRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
    return UUIDRegex.test(uuid)
}

export default new class ThreadService {
    private readonly UserRepo = prisma.users
    private readonly ThreadRepo = prisma.threads

    async FindThreadAll(req: Request, res: Response): Promise<Response> {
        try{
            const page = parseInt(req.params.page) || 1
            const pageSize = 10
            const skip = (page - 1) * pageSize
            const totalData = await this.ThreadRepo.count()
            const totalPages = Math.ceil(totalData / pageSize)

            if(page > totalPages) return res.status(404).json({ message: "Page Not Found!" })

            const thisThreads = await this.ThreadRepo.findMany({
                skip: skip,
                take: pageSize,
                include: {
                    user: true,
                    replies: true,
                    likes: true
                },
                orderBy: {
                    created_at: "desc"
                }
            })

            const displayedThreads = {
                data: thisThreads,
                pagination: {
                    totalData,
                    totalPages,
                    currentPage: page,
                    pageSize
                }
            }

            return res.status(200).json({
                code: 200,
                status: "All Threads Found!",
                data: displayedThreads
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async FindThreadById(req: Request, res: Response): Promise<Response> {
        try{
            const threadId = req.params.thread_id
    
            if(!isValidUUID(threadId)) return res.status(404).json({ message: "Invalid Thread ID!" })

            const thisThread = await this.ThreadRepo.findUnique({
                where: { id: threadId },
                include: {
                    user: true,
                    replies: {
                        include: {
                            user: true
                        }
                    },
                    likes: true
                }
            })

            if(!thisThread) return res.status(404).json({ message: "Thread Not Found!" })

            return res.status(200).json({
                code: 200,
                status: "Found Thread!",
                data: thisThread
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async AddThread(req: Request, res: Response): Promise<Response> {
        try{
            const idSession = res.locals.login_session.UserPayload.id

            const thisUser = await this.UserRepo.findUnique({ where: { id: idSession } })

            if(!thisUser) return res.status(404).json({ message: "User Not Found!" })

            const id = req.params.id

            if(!isValidUUID(id)) return res.status(400).json({ message: "Invalid User ID!" })

            if(idSession !== id) return res.status(400).json({ message: "ID Does Not Match!" })

            const body = req.body
            const { error, value } = addThread.validate(body)

            if(error) return res.status(400).json({ 
                status: "Input Validation Error!",
                message: error.message 
            })

            const image = req.file
            let imageURL = ""

            if(!image) {
                imageURL = ""
            }else {
                const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
                    folder: "thread_pictures"
                })
                imageURL = cloudinaryUpload.secure_url
                fs.unlinkSync(image.path)
            }

            const newThread = await this.ThreadRepo.create({
                data: {
                    content: value.content,
                    image: imageURL,
                    user: { connect: { id: id } }
                }
            })

            return res.status(201).json({
                code: 201,
                status: "Add Thread Success!",
                data: newThread
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async UpdateThread(req: Request, res: Response): Promise<Response> {
        try{
            const id = res.locals.login_session.UserPayload.id
            const thisUser = await this.UserRepo.findUnique({ where: { id: id } })

            if(!thisUser) return res.status(404).json({ message: "User Not Found!" })

            const threadId = req.params.thread_id

            if(!isValidUUID(threadId)) return res.status(400).json({ message: "Invalid Thread ID!" })

            const thisThread = await this.ThreadRepo.findUnique({ where: { id: threadId } })

            if(!thisThread) return res.status(404).json({ message: "Thread Not Found!" })

            const body = req.body
            const { error, value } = updateThread.validate(body)

            if(error) return res.status(400).json({ 
                status: "Input Validation Error!", 
                message: error.message 
            })

            const image = req.file
            let content = thisThread.content
            let imageURL = thisThread.image || ""

            if(body.content !== undefined && body.content !== "") {
                content = value.content
            }

            if(image) {
                const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
                    folder: "thread_pictures"
                })
                imageURL = cloudinaryUpload.secure_url
                fs.unlinkSync(image.path)

                if(thisThread && thisThread.image) {
                    const oldImage = thisThread.image.split("/").pop()?.split(".")[0]
                    await cloudinary.uploader.destroy(oldImage as string)
                }
            }

            const updatedThread = await this.ThreadRepo.update({
                where: { id: threadId },
                data: {
                    content: content,
                    image: imageURL,
                    user: { connect: { id: id } }
                }
            })

            return res.status(200).json({
                code: 200,
                status: "Update Thread Success!",
                data: updatedThread
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async DeleteThread(req: Request, res: Response): Promise<Response> {
        try{
            const id = res.locals.login_session.UserPayload.id
            const thisUser = await this.UserRepo.findUnique({ where: { id: id } })

            if(!thisUser) return res.status(404).json({ message: "User Not Found!" })

            const threadId = req.params.thread_id

            if(!isValidUUID(threadId)) return res.status(400).json({ message: "Invalid Thread ID!" })

            const thisThread = await this.ThreadRepo.findUnique({
                where: { id: threadId },
                select: {
                    image: true
                }
            })

            if(thisThread && thisThread.image) {
                const oldImage = thisThread.image.split("/").pop()?.split(".")[0]
                await cloudinary.uploader.destroy(oldImage as string)
            }

            const deletedThread = await this.ThreadRepo.delete({ where: { id: threadId } })

            return res.status(200).json({
                code: 200,
                status: "Delete Thread Success!",
                data: deletedThread
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }
}