import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"
import cloudinary from "../CloudinaryConfig"
import * as bcrypt from "bcrypt"

import { updateProfile, updateProfilePicture, updatePassword } from "../utils/UserUtil"

const prisma = new PrismaClient()

function isValidUUID(uuid: string): boolean {
    const UUIDRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
    return UUIDRegex.test(uuid)
}

export default new class UserService {
    private readonly UserRepo = prisma.users
    private readonly FollowRepo = prisma.follow
    private readonly ThreadRepo = prisma.threads
    private readonly RepliesRepo = prisma.replies
    private readonly LikeRepo = prisma.likes

    async FindUserAll(req: Request, res: Response): Promise<Response> {
        try{
            const id = res.locals.login_session.UserPayload.id
            const page = parseInt(req.params.page) || 1
            const pageSize = 10
            const skip = (page-1) * pageSize
            const totalData = await this.UserRepo.count({
                where: {
                    NOT: {
                        id: id
                    }
                }
            })
            const totalPages = Math.ceil(totalData / pageSize)

            if(page > totalPages) return res.status(404).json({ message: "Page Not Found!" })

            const dataUsers = await this.UserRepo.findMany({
                skip: skip,
                take: pageSize,
                where: {
                    NOT: {
                        id: id
                    }
                }
            })

            const displayedUsers = {
                dataUsers,
                pagination: {
                    totalData,
                    totalPages,
                    currentPage: page,
                    pageSize
                }
            }

            return res.status(200).json({
                code: 200,
                status: "All User Found!",
                data: displayedUsers
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async FindUserById(req: Request, res: Response): Promise<Response> {
        try{
            const userId = req.params.user_id

            if(!isValidUUID(userId)) return res.status(400).json({ message: "Invalid User ID!" })

            const thisUser = await this.UserRepo.findUnique({
                where: { id: userId },
                include: {
                    follower: true,
                    following: true,
                    threads: true,
                    replies: true,
                    likes: true
                }
            })

            if(!thisUser) return res.status(404).json({ message: "User Not Found!" })

            return res.status(200).json({
                code: 200,
                status: "User Found!",
                data: thisUser
            })
        }catch(err) {
            return res.status(500).json({ message: err})
        }
    }

    async FindUserByName(req: Request, res: Response): Promise<Response> {
        try{
            const name = req.params.name

            const thisUser = await this.UserRepo.findMany({ where: { full_name: name } })

            if(!thisUser) return res.status(404).json({ message: "User Not Found!" })
            
            return res.status(200).json({
                code: 200,
                status: "User Found!",
                data: thisUser
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async UpdateProfile(req: Request, res: Response): Promise<Response> {
        try{
            const id = req.params.id

            if(!isValidUUID(id)) return res.status(400).json({ message: "Invalid User ID!" })
            
            const idSession = res.locals.login_session.UserPayload.id

            if(id !== idSession) return res.status(400).json({ message: "ID Does Not Match!" })

            const thisUser = await this.UserRepo.findUnique({ where: { id: id } })

            if(!thisUser) return res. status(404).json({ message: "User Not Found!" })

            const body = req.body
            const { error, value } = updateProfile.validate(body)

            if(error) return res.status(400).json({ 
                status: "Input Validation Error!",
                message: error.message
            })

            let username = thisUser.username
            let full_name = thisUser.full_name
            let bio = thisUser.bio

            if(body.full_name !== undefined && body.full_name !== "") {
                full_name = value.full_name
                const userId = uuidv4()
                const userUUID = userId.substring(0, 8).replace(/-/g, "")
                username = `User_${userUUID}_${value.full_name.replace(/\s/g, "_")}`
            }

            if(body.bio !== undefined && body.bio !== "") {
                bio = value.bio
            }

            const updatedProfile = await this.UserRepo.update({
                where: { id: id },
                data: {
                    username: username,
                    full_name: full_name,
                    bio: bio
                }
            })

            return res.status(200).json({
                code: 200,
                status: "Update Profile Success!",
                data: updatedProfile
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async UpdateProfilePicture(req: Request, res: Response): Promise<Response> {
        try{
            const id = req.params.id

            if(!isValidUUID(id)) return res.status(400).json({ message: "Invalid User ID!" })

            const idSession = res.locals.login_session.UserPayload.id

            if(id !== idSession) return res.status(400).json({ message: "ID Does Not Match!" })

            const image = req.file
            const { error } = updateProfilePicture.validate(image)

            if(!image) return res.status(400).json({ message: "No File Uploaded!" })

            if(error) return res.status(400).json({ 
                status: "Input Validation Error!",
                message: error.message
            })

            const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
                folder: "profile_pic"
            })

            const profilePicURL = cloudinaryUpload.secure_url

            const oldUserData = await this.UserRepo.findUnique({
                where: { id: id },
                select: {
                    profile_picture: true
                }
            })

            if(oldUserData && oldUserData.profile_picture) {
                const oldProfilePic = oldUserData.profile_picture.split("/").pop()?.split(".")[0]
                await cloudinary.uploader.destroy(oldProfilePic as string)
            }

            const updatedProfilePic = await this.UserRepo.update({
                where: { id: id },
                data: {
                    profile_picture: profilePicURL
                }
            })

            return res.status(200).json({
                code: 200,
                status: "Update Profile Picture Success!",
                data: updatedProfilePic
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async UpdatePassword(req: Request, res: Response): Promise<Response> {
        try{
            const id = req.params.id

            if(!isValidUUID(id)) return res.status(400).json({ message: "Invalid User ID!" })

            const idSession = res.locals.login_session.UserPayload.idSession

            if(id !== idSession) return res.status(400).json({ message: "ID Does Not Match!" })

            const body = req.body
            const { error, value } = updatePassword.validate(body)

            if(error) return res.status(400).json({ 
                status: "Input Validation Error!",
                message: error.message
            })

            const newHashedPassword = await bcrypt.hash(value.password, 10)

            const updatedPassword = await this.UserRepo.update({
                where: { id: id },
                data: {
                    password: newHashedPassword
                }
            })

            return res.status(200).json({
                code: 200,
                status: "Update Password Success!",
                data: updatedPassword
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async GetSuggestedUser(req: Request, res: Response): Promise<Response> {
        try{
            const limit = parseInt(req.query.limit as string) || 5
            const skip = Math.floor(Math.random() * 5)
            
            const thisUser = await this.UserRepo.findMany({
                take: limit,
                skip: skip,
                select: {
                    id: true,
                    username: true,
                    full_name: true,
                    profile_picture: true,
                    following: true
                }
            })

            return res.status(200).json({
                code: 200,
                status: "Suggested User Found!",
                data: thisUser
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async DeleteUser(req: Request, res: Response): Promise<Response> {
        try{
            const id = req.params.id

            if(!isValidUUID(id)) return res.status(400).json({ message: "Invalid User ID!" })

            const idSession = res.locals.login_session.UserPayload.id

            if(id !== idSession) return res.status(400).json({ message: "ID Does Not Match!" })

            const thisUser = await this.UserRepo.findUnique({
                where: { id: id },
                include: {
                    threads: true,
                    replies: true,
                    likes: true
                }
            })

            if(thisUser && thisUser.profile_picture) {
                const oldProfilePic = thisUser.profile_picture.split("/").pop()?.split(".")[0]
                await cloudinary.uploader.destroy(oldProfilePic as string)
            }else if(!thisUser) {
                return res.status(404).json({ message: "User Not Found!" })
            }

            await this.FollowRepo.findMany({
                where: {
                    OR: [
                        { following_id: id },
                        { follower_id: id }
                    ]
                }
            })

            await Promise.all([
                this.ThreadRepo.deleteMany({ where: { user_id: id } }),
                this.RepliesRepo.deleteMany({ where: { user_id: id } }),
                this.LikeRepo.deleteMany({ where: { user_id: id } })
            ])

            const deletedUser = await this.UserRepo.delete({
                where: { id: id }
            })

            return res.status(200).json({
                code: 200,
                status: "Delete User Success!",
                data: deletedUser
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }
}