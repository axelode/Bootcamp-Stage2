import WalletService from "../services/WalletService"
import { Request, Response } from "express"

export default new class WalletController {
    findWalletById(req: Request, res: Response) {
        WalletService.findWalletById(req, res)
    }
}