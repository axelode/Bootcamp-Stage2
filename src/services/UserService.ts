import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { register, login } from "../utils/UserUtil"
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcrypt"

const prisma = new PrismaClient()

export default new class UserService {
    private readonly UserRepo = prisma.tb_user
    private readonly WalletRepo = prisma.tb_wallet
    private readonly PendingRepo = prisma.tb_pending_transaction

    async register(req: Request, res: Response): Promise<Response> {
        try{
            const body = req.body
            const { error, value } = register.validate(body)

            if(error) return res.status(409).json({ message: "Input Validation Error!", status: error.message })

            const isRegistedEmail = await this.UserRepo.count({ where: { email: value.email } })

            if(isRegistedEmail > 0) return res.status(400).json({ message: "Email Already Registed!" })

            const hashedPassword = await bcrypt.hash(value.password, 10)

            if(hashedPassword === value.password) return res.status(409).json({ message: "Password Not Hased!" })

            const newUser = await this.UserRepo.create({
                data: {
                    email: value.email,
                    password: hashedPassword,
                    full_name: value.full_name
                }
            })

            return res.status(201).json(newUser)
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try{
            const body = req.body
            const { error, value } = login.validate(body)

            if(error) return res.status(409).json({ message: "Input Validation Error!", status: error.message })

            const isRegistedEmail = await this.UserRepo.findUnique({ where: { email: value.email } })

            if(!isRegistedEmail) return res.status(409).json({ message: "Email Not Registed!" })

            const isMatchPassword = await bcrypt.compare(value.password, isRegistedEmail.password)

            if(!isMatchPassword) return res.status(409).json({ message: "Password Incorrect!" })

            let role: string = "User"
            let isAdmin: boolean = false

            if(value.email === "admin@mail.com" && value.password === "admin1") {
                role = "Admin"
                isAdmin = true
            }

            const userPayload = {
                id: isRegistedEmail.id,
                name: isRegistedEmail.full_name,
                role: role,
                isAdmin: isAdmin
            }

            const userToken = jwt.sign({ userPayload }, `${process.env.SECRET_KEY}`, { expiresIn: 86400 })

            if(!userToken) return res.status(400).json({ message: "Token Sign Failed!" })

            // pengecekan wallet

            const isWallet: any = await this.WalletRepo.findUnique({ where: { user_id: isRegistedEmail.id } })

            let thisWallet: any = "Wallet Already Added!"

            if(!isWallet) {
                const addWallet = await this.WalletRepo.create({
                    data: {
                        inflow: 0,
                        outflow: 0,
                        balance: 0,
                        user_id: isRegistedEmail.id
                    }
                })

                thisWallet = addWallet
            }

            // pengecekan pending transaction

            const inflow = isWallet.inflow
            const outflow = isWallet.outflow

            const thisPendingTransaction = await this.PendingRepo.findMany({ 
                where: { user_id: isRegistedEmail.id },
                include: {
                    category_detail: true
                } 
            })

            if(!thisPendingTransaction) return res.status(200).json({ message: "No Pending Transaction Found!" })

            let updateWallet: any = "No Pending Transaction Found!"

            {thisPendingTransaction.map(async (data) => {
                const tMonth: number = new Date().getMonth() + 1
                const tYear: number = new Date().getFullYear()
                
                const dMonth: number = new Date(data.date).getMonth() + 1
                const dYear: number = new Date(data.date).getFullYear()

                if(dMonth === tMonth && dYear === tYear) {
                    if(data.category_detail.type === "Income") {
                        const incomeWallet = await this.WalletRepo.update({
                                where: {user_id: isRegistedEmail.id},
                                data: {
                                    inflow: inflow + data.amount,
                                    balance: thisWallet.balance + data.amount,
                                    user_id: isRegistedEmail.id
                                }
                            })
    
                        updateWallet = incomeWallet
                    }else {
                        const outcomeWallet = await this.WalletRepo.update({
                            where: {user_id: isRegistedEmail.id},
                            data: {
                                outflow: outflow + data.amount,
                                balance: thisWallet.balance - data.amount,
                                user_id: isRegistedEmail.id
                            }
                        })

                        updateWallet = outcomeWallet
                    }
                    await this.PendingRepo.delete({ where: { id: data.id } })
                }
            })}

            return res.status(201).json({ userToken, thisWallet, updateWallet })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async logout(req: Request, res: Response): Promise<Response> {
        try{
            delete res.locals.login_session
            return res.status(200).json({ status: "Logout Success!" })
        }catch(err) {
            return res.status(500).json({ status: "Logout Failed!", message: err })
        }
    }
}