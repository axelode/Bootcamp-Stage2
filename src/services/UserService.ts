import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default new class UserService{
    async find(req: Request, res: Response) {
        try{
            const users = await prisma.user.findMany()
            return res.status(200).json(users)
        }catch(err) {
            return res.status(500).json(err)
        }
    }

    async findById(req: Request, res: Response) {
        try{
            const id = Number(req.params.id)
            const user = await prisma.user.findUnique({where: { id: id }})

            if(user === null) {
                return res.status(404).json({message: "user not found"})
            }

            return res.status(201).json(user)
        }catch(err) {
            return res.status(500).json(err)
        }
    }

    async addUser(req: Request, res: Response) {
        try{
            const body = req.body
            const newUser = await prisma.user.create({
                data: {
                    email: body.email,
                    name: body.name
                }
            })
            return res.status(201).json(newUser)
        }catch(err) {
            return res.status(500).json(err)
        }
    }

    async updateUser(req: Request, res: Response) {
        try{
            const id = Number(req.params.id)
            const body = req.body
            const updateUser = await prisma.user.update({
                where: { id: id },
                data:{
                    email: body.email,
                    name: body.name
                }
            })
            return res.status(201).json(updateUser)
        }catch(err) {
            return res.status(500).json(err)
        }
    }
    
    async deleteUser(req: Request, res: Response) {
        try{
            const id = Number(req.params.id)
            const deleteUser = await prisma.user.delete({
                where: { id: id }
            })
            return res.status(201).json({deleteUser: deleteUser, message: "User deleted!"})
        }catch(err) {
            return res.status(500).json(err)
        }
    }
}