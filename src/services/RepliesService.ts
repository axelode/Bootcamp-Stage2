import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import cloudinary from "../CloudinaryConfig"
import * as fs from "fs"

import { addThread as addReplies, updateThread as updateReplies } from "../utils/ThreadUtil"

const prisma = new PrismaClient()

function isValidUUID(uuid: string): boolean {
    const UUIDRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
    return UUIDRegex.test(uuid)
}

export default new class RepliesService {
    private readonly UserRepo = prisma.users
    private readonly ThreadRepo = prisma.threads
    private readonly RepliesRepo = prisma.replies

    async AddReplies(req: Request, res: Response): Promise<Response> {
        try{
            const id = res.locals.login_session.UserPayload.id

            const thisUser = await this.UserRepo.findUnique({  where: { id: id }})

            if(!thisUser) return res.status(404).json({ message: "User Not Found!" })

            const threadId = req.params.thread_id

            if(!isValidUUID(threadId)) return res.status(400).json({ message: "Invalid Thread ID!" })

            const thisThread = await this.ThreadRepo.findUnique({ where: { id: threadId } })

            if(!thisThread) return res.status(404).json({ message: "Thread Not Found!" })

            const body = req.body
            const { error, value } = addReplies.validate(body)
            
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
                    folder: "replies_pictures"
                })
                imageURL = cloudinaryUpload.secure_url
                fs.unlinkSync(image.path)
            }

            const newReplies = await this.RepliesRepo.create({
                data: {
                    content: value.content,
                    image: imageURL,
                    user: {
                        connect: { id: id }
                    },
                    thread: {
                        connect: { id: threadId }
                    }
                }
            })

            await this.ThreadRepo.update({
                where: { id: threadId },
                data: {
                    replies: { connect: { id: newReplies.id } }
                }
            })

            return res.status(201).json({
                code: 201,
                status: "Add Replies Success!",
                data: newReplies
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async UpdateReplies(req: Request, res: Response): Promise<Response> {
        try{
            const id = res.locals.login_session.UserPayload.id
            const thisUser = await this.UserRepo.findUnique({ where: { id: id } })

            if(!thisUser) return res.status(404).json({ message: "User Not Found!" })

            const { thread_id, replies_id } = req.params

            if(!isValidUUID(thread_id) && !isValidUUID(replies_id)) return res.status(400).json({ message: "Invalid Thread ID or Replies ID!" })

            const thisThread = await this.ThreadRepo.findUnique({ where: { id: thread_id } })

            if(!thisThread) return res.status(404).json({ message: "Thread Not Found!" })

            const thisReplies = await this.RepliesRepo.findUnique({ where: { id: replies_id } })

            if(!thisReplies) return res.status(404).json({ message: "Replies Not Found!" })

            const body = req.body
            const { error, value } = updateReplies.validate(body)

            if(error) return res.status(400).json({ 
                status: "Input Validation Error!", 
                message: error.message
            })

            const image = req.file
            let content = thisReplies.content
            let imageURL = thisReplies.image || ""

            if(body.content !== undefined && body.content !== "") {
                content = value.content
            }

            if(image) {
                const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
                    folder: "replies_pictures"
                })
                imageURL = cloudinaryUpload.secure_url
                fs.unlinkSync(image.path)

                if(thisReplies && thisReplies.image) {
                    const oldImage = thisReplies.image.split("/").pop()?.split(".")[0]
                    await cloudinary.uploader.destroy(oldImage as string)
                }
            }

            const updatedReplies = await this.RepliesRepo.update({
                where: { id: replies_id },
                data: {
                    content: content,
                    image: imageURL
                }
            })

            return res.status(200).json({
                code: 200,
                status: "Update Replies Success!",
                data: updatedReplies
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async DeleteReplies(req: Request, res: Response): Promise<Response> {
        try{
            const id = res.locals.login_session.UserPayload.id
            const thisUser = await this.UserRepo.findUnique({ where: { id: id } })

            if(!thisUser) return res.status(404).json({ message: "User Not Found!" })

            const repliesId = req.params.replies_id

            if(!isValidUUID(repliesId)) return res.status(400).json({ message: "Invalid Replies ID!" })

            const thisReplies = await this.RepliesRepo.findUnique({
                where: { id: repliesId },
                select: {
                    image: true
                }
            })

            if(thisReplies && thisReplies.image) {
                const oldImage = thisReplies.image.split("/").pop()?.split(".")[0]
                await cloudinary.uploader.destroy(oldImage as string)
            }

            const deletedReplies = await this.RepliesRepo.delete({ where: { id: repliesId } })

            return res.status(200).json({
                code: 200,
                status: "Delete Replies Success!",
                data: deletedReplies
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }
}