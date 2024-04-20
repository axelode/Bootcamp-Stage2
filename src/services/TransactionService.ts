import { Request, Response } from "express"
import { addTransaction } from "../utils/TransactionUtil"
import { PrismaClient } from "@prisma/client"
import { number } from "joi"

const prisma = new PrismaClient()

export default new class TransactionService {
    private readonly WalletRepo = prisma.tb_wallet
    private readonly CategoryRepo = prisma.tb_category
    private readonly TransactionRepo = prisma.tb_transaction
    private readonly PendingTransactionRepo = prisma.tb_pending_transaction

    async addTransaction(req: Request, res: Response): Promise<Response> {
        try{
            const body = req.body
            const { error, value } = addTransaction.validate(body)

            if(error) return res.status(400).json({ message: "Input Validation Error!" })

            const id: number = res.locals.login_session.tokenPayload.id

            if(!id) return res.status(404).json({ message: "User ID Not Found!" })

            const thisWallet = await this.WalletRepo.findUnique({ where: {user_id: id} })

            if(!thisWallet) return res.status(404).json({ message: "Wallet Not Found!" })

            const thisCategory = await this.CategoryRepo.findUnique({ where: { category_name: value.category } })

            if(!thisCategory) return res.status(404).json({ message: "Category Not Found!" })

            const newTransaction = await this.TransactionRepo.create({
                data: {
                    amount: value.amount,
                    date: value.date,
                    category: value.category,
                    note: value.note,
                    user_id: id
                }
            })
            
            const inflow: number = thisWallet.inflow + value.amount
            const outflow: number = thisWallet.outflow + value.amount
            let balance: number
            
            let updateWallet: any
            let newPendingTransaction: any
            
            const tMonth: number = new Date().getMonth() + 1
            const dMonth: number = new Date(value.date).getMonth() + 1

            if(dMonth > tMonth) {
                const pendingTransaction = await this.PendingTransactionRepo.create({
                    data: {
                        amount: value.amount,
                        date: value.date,
                        category: value.category,
                        note: value.note,
                        user_id: id
                    }
                })

                newPendingTransaction = pendingTransaction
            }else {
                if(thisCategory?.type === "Income") {
                    balance = thisWallet.balance + value.amount

                    const incomeWallet = await this.WalletRepo.update({
                            where: {user_id: id},
                            data: {
                                inflow: inflow,
                                balance: balance,
                                user_id: id
                            }
                        })

                    updateWallet = incomeWallet
                }else {
                    balance = thisWallet.balance - value.amount

                    const outcomeWallet = await this.WalletRepo.update({
                            where: {user_id: id},
                            data: {
                                outflow: outflow,
                                balance: balance,
                                user_id: id
                            }
                        })

                    updateWallet = outcomeWallet
                }
            }

            return res.status(201).json({ newTransaction, newPendingTransaction, updateWallet })
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async findLastMonthTransaction(req: Request, res: Response): Promise<Response> {
        try{
            const user_id = res.locals.login_session.tokenPayload.id

            if(!user_id) return res.status(404).json({ message: "User ID Not Found!" })
            
            const thisTransaction = await this.TransactionRepo.findMany({
                where: { user_id: user_id },
                include: {
                    category_detail: true
                }
            })
            
            const lastMonth: any[] = []

            {thisTransaction.map((data) => {
                const tMonth: number = new Date().getMonth() + 1
                const tYear: number = new Date().getFullYear()

                const dMonth: number = new Date(data.date).getMonth() + 1
                const dYear: number = new Date(data.date).getFullYear()

                const nData = {
                    ...data,
                    dMonth,
                    dYear
                }

                if(nData.dMonth + 1 === tMonth && nData.dYear === tYear) {
                    lastMonth.push(nData)
                }

            })}

            return res.status(201).json(lastMonth)
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async findThisMonthTransaction(req: Request, res: Response): Promise<Response> {
        try{
            const user_id = res.locals.login_session.tokenPayload.id

            if(!user_id) return res.status(404).json({ message: "User ID Not Found!" })
            
            const thisTransaction = await this.TransactionRepo.findMany({
                where: { user_id: user_id },
                include: {
                    category_detail: true
                }
            })
            
            const thisMonth: any[] = []

            {thisTransaction.map((data) => {
                const tMonth: number = new Date().getMonth() + 1
                const tYear: number = new Date().getFullYear()

                const dMonth: number = new Date(data.date).getMonth() + 1
                const dYear: number = new Date(data.date).getFullYear()

                const nData = {
                    ...data,
                    dMonth,
                    dYear
                }

                if(nData.dMonth === tMonth && nData.dYear === tYear) {
                    thisMonth.push(nData)
                }

            })}

            return res.status(201).json(thisMonth)
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }
    
    async findFutureTransaction(req: Request, res: Response): Promise<Response> {
        try{
            const user_id = res.locals.login_session.tokenPayload.id

            if(!user_id) return res.status(404).json({ message: "User ID Not Found!" })
            
            const thisTransaction = await this.TransactionRepo.findMany({
                where: { user_id: user_id },
                include: {
                    category_detail: true
                }
            })
            
            const thisFuture: any[] = []

            {thisTransaction.map((data) => {
                const tMonth: number = new Date().getMonth() + 1
                const tYear: number = new Date().getFullYear()

                const dMonth: number = new Date(data.date).getMonth() + 1
                const dYear: number = new Date(data.date).getFullYear()

                const nData = {
                    ...data,
                    dMonth,
                    dYear
                }

                if(tMonth + 1 === nData.dMonth && tYear === nData.dYear) {
                    thisFuture.push(nData)
                }

            })}

            return res.status(201).json(thisFuture)
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }
}