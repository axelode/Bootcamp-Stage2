import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default new class WalletService {
    private readonly WalletRepo = prisma.tb_wallet

    async findWalletById(req: Request, res: Response) {
        try{
            const tokenDecode = res.locals.loginSession.tokenPayload
            const id = tokenDecode.id

            const thisWallet = await this.WalletRepo.findUnique({
                where: { id: id }
            })

            return res.status(201).json(thisWallet)
        }catch(err) {
            return res.status(500).json(err)
        }
    }
}