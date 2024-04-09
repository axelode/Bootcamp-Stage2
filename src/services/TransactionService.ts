import { Request, Response } from "express"
import { addTransaction } from "../utils/TransactionUtil"
import { PrismaClient } from "@prisma/client"
import { number } from "joi"

const prisma = new PrismaClient()

export default new class TransactionService {
    private readonly TransactionRepo = prisma.tb_transaction
    private readonly WalletRepo = prisma.tb_wallet
    private readonly CategoryRepo = prisma.tb_category

    async addTransaction(req: Request, res: Response): Promise<Response> {
        try{
            const body = req.body
            const { error } = addTransaction.validate(body)
            if(error) return res.status(400).json(error.message)

            const tokenDecode = res.locals.loginSession.tokenPayload
            const id: number = tokenDecode.id

            const thisWallet = await this.WalletRepo.findUnique({ 
                where: {user_id: id}
            })

            if(!thisWallet) return res.status(400).json({ message: "Wallet not found!" })

            const thisCategory = await this.CategoryRepo.findUnique({
                where: { category_name: body.category }
            })

            if(!thisCategory) return res.status(400).json({ message: "Category not found!" })

            const newTransaction = await this.TransactionRepo.create({
                data: {
                    amount: body.amount,
                    date: body.date,
                    category: body.category,
                    note: body.note,
                    user_id: id,
                    created_at: new Date()
                }
            })

            const in_flow: number = thisWallet.in_flow + body.amount
            const out_flow: number = thisWallet.out_flow + body.amount
            let balance: number

            let updatedWallet: any

            if(thisCategory?.type === "Income") {
                balance = thisWallet.balance + body.amount

                const updateWallet = await this.WalletRepo.update({
                        where: {user_id: id},
                        data: {
                            in_flow: in_flow,
                            balance: balance,
                            user_id: id
                        }
                    })

                    updatedWallet = updateWallet
            }else {
                balance = thisWallet.balance - body.amount

                const updateWallet = await this.WalletRepo.update({
                        where: {user_id: id},
                        data: {
                            out_flow: out_flow,
                            balance: balance,
                            user_id: id
                        }
                    })

                    updatedWallet = updateWallet
            }

            return res.status(201).json({ newTransaction, updatedWallet })
        }catch(err) {
            return res.status(500).json(err)
        }
    }

    async findTransactionByUserId(req: Request, res: Response) {
        try{
            const tokenDecode = res.locals.loginSession.tokenPayload
            const user_id: number = tokenDecode.id

            const thisTransaction = await this.TransactionRepo.findMany({
                where: { user_id: user_id },
                include: {
                    category_detail: true
                }
            })

            return res.status(201).json(thisTransaction)
        }catch(err) {
            return res.status(500).json(err)
        }
    }

    async findLastMonthTransaction(req: Request, res: Response) {
        try{
            const tokenDecode = res.locals.loginSession.tokenPayload
            const user_id = tokenDecode.id
            
            const thisTransaction = await this.TransactionRepo.findMany({
                where: { user_id: user_id },
                include: {
                    category_detail: true
                }
            })
            
            const lastMonth: any[] = []

            {thisTransaction.map((data) => {
                const tMonth: number = new Date().getMonth() + 1

                const dMonth: number = new Date(data.date).getMonth() + 1

                const nData = {
                    ...data,
                    dMonth
                }

                if(nData.dMonth + 1 === tMonth) {
                    lastMonth.push(nData)
                }

            })}

            return res.status(201).json(lastMonth)
        }catch(err) {
            return res.status(500).json(err)
        }
    }

    async findThisMonthTransaction(req: Request, res: Response) {
        try{
            const tokenDecode = res.locals.loginSession.tokenPayload
            const user_id = tokenDecode.id
            
            const thisTransaction = await this.TransactionRepo.findMany({
                where: { user_id: user_id },
                include: {
                    category_detail: true
                }
            })
            
            const thisMonth: any[] = []

            {thisTransaction.map((data) => {
                const tMonth: number = new Date().getMonth() + 1

                const dMonth: number = new Date(data.date).getMonth() + 1

                const nData = {
                    ...data,
                    dMonth
                }

                if(nData.dMonth === tMonth) {
                    thisMonth.push(nData)
                }

            })}

            return res.status(201).json(thisMonth)
        }catch(err) {
            return res.status(500).json(err)
        }
    }
    
    async findFutureTransaction(req: Request, res: Response) {
        try{
            const tokenDecode = res.locals.loginSession.tokenPayload
            const user_id = tokenDecode.id
            
            const thisTransaction = await this.TransactionRepo.findMany({
                where: { user_id: user_id },
                include: {
                    category_detail: true
                }
            })
            
            const thisFuture: any[] = []

            {thisTransaction.map((data) => {
                const tMonth: number = new Date().getMonth() + 1

                const dMonth: number = new Date(data.date).getMonth() + 1

                const nData = {
                    ...data,
                    dMonth
                }

                if(tMonth + 1 === nData.dMonth) {
                    thisFuture.push(nData)
                }

            })}

            return res.status(201).json(thisFuture)
        }catch(err) {
            return res.status(500).json(err)
        }
    }
}