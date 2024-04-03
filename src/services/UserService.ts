import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { register, login } from "../utils/UserUtil"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export default new class UserService {
    private readonly UserRepo = prisma.tb_user
    private readonly WalletRepo = prisma.tb_wallet

    async register(req: Request, res: Response): Promise<Response> {
        try{
            const body = req.body
            const { error } = register.validate(body)
            if(error) return res.status(400).json(error.message)

            const isRegistedEmail = await this.UserRepo.count({
                where: { email: body.email } 
            })

            if(isRegistedEmail > 0) return res.status(400).json({message: "Email already registed!"})

            const hashedPassword = await bcrypt.hash(body.password, 10)

            const newUser = await this.UserRepo.create({
                data: {
                    email: body.email,
                    password: hashedPassword,
                    full_name: body.full_name
                }
            })

            return res.status(201).json(newUser)
        }catch(err) {
            return res.status(500).json(err)
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try{
            const body = req.body
            const { error, value } = login.validate(body)
            if(error) return res.status(400).json(error.message)

            const isRegistedEmail = await this.UserRepo.findUnique({
                where: { email: value.email }
            })

            if(!isRegistedEmail) return res.status(409).json({message: "Email not registered!"})

            const isMatchPassword = await bcrypt.compare(value.password, isRegistedEmail.password)
            if(!isMatchPassword) return res.status(409).json({message: "Password incorrect!"})

            const tokenPayload = {
                id: isRegistedEmail.id
            }

            const token = jwt.sign({ tokenPayload }, 'SECRET_KEY', { expiresIn: 99999 })

            const isWallet = await this.WalletRepo.findUnique({
                where: { user_id: isRegistedEmail.id }
            })

            let thisWallet: any = 'Wallet already added!'

            if(!isWallet) {
                const addWallet = await this.WalletRepo.create({
                    data: {
                        in_flow: 0,
                        out_flow: 0,
                        balance: 0,
                        user_id: isRegistedEmail.id
                    }
                })

                thisWallet = addWallet
            }

            return res.status(201).json({ token, thisWallet })
        }catch(err) {
            return res.status(500).json(err)
        }
    }
}