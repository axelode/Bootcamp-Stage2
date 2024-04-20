import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default new class WalletService {
    private readonly WalletRepo = prisma.tb_wallet
    private readonly PendingRepo = prisma.tb_pending_transaction

    async findWalletByUserId(req: Request, res: Response): Promise<Response> {
        try{
            const id: number = res.locals.login_session.tokenPayload.id

            if(!id) return res.status(404).json({ message: "User ID Not Found!" })

            const thisWallet = await this.WalletRepo.findUnique({ where: { user_id: id } })

            if(!thisWallet) return res.status(404).json({ message: "Wallet Not Found!" })

            return res.status(201).json(thisWallet)
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async updateWalletFromPendingTransaction(req: Request, res: Response): Promise<Response> {
        try{
            const id: number = res.locals.login_session.tokenPayload.id

            if(!id) return res.status(404).json({ message: "User ID Not Found!" })

            const thisWallet = await this.WalletRepo.findUnique({ where: { user_id: id } })

            if(!thisWallet) return res.status(404).json({ message: "Wallet Not Found!" })

            const inflow = thisWallet.inflow !== null?  thisWallet.inflow : ""
            const outflow = thisWallet.outflow !== null? thisWallet.outflow : ""

            if(!inflow || !outflow) return res.status(400).json({ message: "Inflow or Outflow Null!" })

            const thisPendingTransaction = await this.PendingRepo.findMany({ 
                where: { user_id: id },
                include: {
                    category_detail: true
                } 
            })

            if(!thisPendingTransaction) return res.status(200).json({ status: "No Pending Transaction Found!" })

            let updateWallet: any

            {thisPendingTransaction.map(async (data) => {
                const tMonth: number = new Date().getMonth() + 1
                const tYear: number = new Date().getFullYear()
                
                const dMonth: number = new Date(data.date).getMonth() + 1
                const dYear: number = new Date(data.date).getFullYear()

                if(dMonth === tMonth && dYear === tYear) {
                    if(data.category_detail.type === "Income") {
                        const incomeWallet = await this.WalletRepo.update({
                                where: {user_id: id},
                                data: {
                                    inflow: inflow + data.amount,
                                    balance: thisWallet.balance + data.amount,
                                    user_id: id
                                }
                            })
    
                        updateWallet = incomeWallet
                    }else {
                        const outcomeWallet = await this.WalletRepo.update({
                            where: {user_id: id},
                            data: {
                                outflow: outflow + data.amount,
                                balance: thisWallet.balance - data.amount,
                                user_id: id
                            }
                        })

                        updateWallet = outcomeWallet
                    }
                    await this.PendingRepo.delete({ where: { id: data.id } })
                }
            })}

            return res.status(200).json(updateWallet)
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }
}