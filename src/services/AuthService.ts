import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import { v4 as uuidv4 } from "uuid"
import { register, login } from "../utils/AuthUtil"

const prisma = new PrismaClient()

export default new class AuthService {
    private readonly UserRepo = prisma.users

    async Register(req: Request, res: Response): Promise<Response> {
        try{
            const body = req.body
            const { error, value } = register.validate(body)

            if(error) return res.status(400).json({ 
                status: "Input Validation Error!",
                message: error.message
            })

            const isRegistedEmail = await this.UserRepo.findUnique({ where: { email: value.email } })

            if(isRegistedEmail) return res.status(409).json({ message: "Email Already Registed!" })
            
            const hashedPassword = await bcrypt.hash(value.password, 10)
            
            const uuid = uuidv4()
            const userUUID = uuid.substring(0, 8).replace(/-/g, "")
            const userName = `User_${userUUID}_${value.full_name.replace(/\s/g, "_")}`

            const newUser = await this.UserRepo.create({
                data: {
                    username: userName,
                    full_name: value.full_name,
                    email: value.email,
                    password: hashedPassword,
                    profile_picture: "",
                    bio: ""
                }
            })

            return res.status(201).json({
                code: 201,
                status: "Register Success!",
                data: newUser
            })
        }catch(err) {
            return res.status(500).json({ 
                code: 500,
                status: "Register Failed!",
                message: err 
            })
        }
    }

    async Login(req: Request, res: Response): Promise<Response> {
        try{
            const body = req.body
            const { error, value } = login.validate(body)

            if(error) return res.status(400).json({ 
                status: "Input Validation Error!",
                message: error.message
            })

            const isRegistedEmail = await this.UserRepo.findUnique({ where: { email: value.email } })

            if(!isRegistedEmail) return res.status(409).json({ message: "Email Not Registed!" })
            
            const isMatchPassword = await bcrypt.compare(value.password, isRegistedEmail.password)

            if(!isMatchPassword) return res.status(409).json({ message: "Incorrect Password!" })

            const UserPayload = {
                id: isRegistedEmail.id,
                username: isRegistedEmail.username
            }

            const userToken = jwt.sign({ UserPayload }, `${process.env.SECRET_KEY}`, { expiresIn: 86400 })

            return res.status(201).json({ 
                code: 201,
                status: "Created Token and Login Success!",
                data: userToken
            })
        }catch(err) {
            return res.status(500).json({ 
                code: 500,
                status: "Login Failed!",
                message: err 
            })
        }
    }

    async Check(req: Request, res: Response): Promise<Response> {
        try{
            const id = res.locals.login_session.UserPayload.id

            const thisUser = await this.UserRepo.findUnique({ where: { id: id } })

            if(!thisUser) return res.status(404).json({ message: "User Not Found!" })

            return res.status(200).json({
                code: 200,
                status: "User Found and Have Token!",
                data: thisUser
            })
        }catch(err) {
            return res.status(500).json({ 
                code: 500,
                status: "User Not Found or User Not Have Token!",
                message: err 
            })
        }
    }

    async Logout(req: Request, res: Response): Promise<Response> {
        try{
            localStorage.clear()
            return res.status(200).json({ 
                code: 200,
                status: "Logout Success!" 
            })
        }catch(err) {
            return res.status(500).json({ 
                code: 500,
                status: "Logout Failed!", 
                message: err 
            })
        }
    }
}