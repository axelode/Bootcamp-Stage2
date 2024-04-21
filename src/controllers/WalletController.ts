import WalletService from "../services/WalletService"
import { Request, Response } from "express"

export default new class WalletController {
    findWalletByUserId(req: Request, res: Response) {
        WalletService.findWalletByUserId(req, res)
    }
}