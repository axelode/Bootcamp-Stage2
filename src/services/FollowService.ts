import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function isValidUUID(uuid: string): boolean {
    const UUIDRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
    return UUIDRegex.test(uuid)
}

export default new class FollowService {
    private readonly UserRepo = prisma.users
    private readonly FollowRepo = prisma.follow

    async Follow(req: Request, res: Response): Promise<Response> {
        try{
            const followingId = req.params.following_id

            if(!isValidUUID(followingId)) return res.status(400).json({ message: "Invalid Following ID! " })

            const id = res.locals.login_session.UserPayload.id

            if(followingId == id) return res.status(400).json({ message: "Follow Denied!" })

            const followingUser = await this.UserRepo.findUnique({ where: { id: followingId } })

            if(!followingUser) return res.status(404).json({ message: "User to Follow Not Found!" })

            const followerUser = await this.UserRepo.findUnique({ where: { id: id } })

            if(!followerUser) return res.status(404).json({ message: "User Will Follow Not Found!" })

            const exitingFollow = await this.FollowRepo.findFirst({
                where: {
                    following_id: id,
                    follower_id: followingId
                }
            })

            if(exitingFollow) {
                await this.FollowRepo.delete({
                    where: { id: exitingFollow.id }
                })
                
                return res.status(200).json({
                    code: 200,
                    status: "Unfollow Success!"
                })
            }

            const followUser = await this.FollowRepo.create({
                data: {
                    following_id: id,
                    follower_id: followingId
                }
            })

            return res.status(201).json({
                code: 200,
                status: "Follow Success!",
                data: followUser
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }
}