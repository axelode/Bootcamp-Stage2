import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default new class WalletService {
    private readonly WalletRepo = prisma.tb_wallet
    private readonly PendingRepo = prisma.tb_pending_transaction

    async findWalletByUserId(req: Request, res: Response): Promise<Response> {
        try{
            const id: number = res.locals.login_session.userPayload.id

            if(!id) return res.status(404).json({ message: "User ID Not Found!" })

            const thisWallet = await this.WalletRepo.findUnique({ where: { user_id: id } })

            if(!thisWallet) return res.status(404).json({ message: "Wallet Not Found!" })

            return res.status(201).json(thisWallet)
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }
}