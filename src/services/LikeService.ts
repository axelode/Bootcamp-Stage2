import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

function isValidUUID(uuid: string): boolean {
    const UUIDRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i
    return UUIDRegex.test(uuid)
}

export default new class LikeService {
    private readonly UserRepo = prisma.users
    private readonly ThreadRepo = prisma.threads
    private readonly LikeRepo = prisma.likes

    async Like(req: Request, res: Response): Promise<Response> {
        try{
            const id = res.locals.login_session.UserPayload.id
            const thisUser = await this.UserRepo.findUnique({ where: { id: id } })

            if(!thisUser) return res.status(404).json({ message: "User Not Found!" })

            const threadId = req.params.thread_id

            if(!isValidUUID(threadId)) return res.status(400).json({ message: "Invalid Thread ID!" })

            const thisThread = await this.ThreadRepo.findUnique({ 
                where: { id: threadId },
                include: {
                    likes: true
                }
            })

            const exitingLike = thisThread?.likes.find(likes => likes.user_id === id)

            // const exitingLike = await this.LikeRepo.findFirst({ 
            //     where: { 
            //         user_id: id,
            //         thread_id: threadId
            //     } 
            // })

            if(exitingLike) {
                await this.LikeRepo.delete({ where: { id: exitingLike.id } })
                await this.ThreadRepo.update({
                    where: { id: threadId },
                    data: {
                        isLiked: false
                    }
                })

                return res.status(200).json({
                    code: 200,
                    status: "Unlike Success!"
                })
            }

            const likedThread = await this.LikeRepo.create({
                data: {
                    user_id: id,
                    thread_id: threadId
                }
            })

            await this.ThreadRepo.update({
                where: { id: threadId },
                data: {
                    isLiked: true
                }
            })

            return res.status(200).json({
                code: 200,
                status: "Like Success!",
                data: likedThread
            })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }
}