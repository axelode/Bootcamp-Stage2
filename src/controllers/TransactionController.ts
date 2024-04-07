import TransactionService from "../services/TransactionService"
import { Request, Response } from "express"

export default new class TransactionController {
    addTransaction(req: Request, res: Response) {
        TransactionService.addTransaction(req, res)
    }

    findTransactionByUserId(req: Request, res: Response) {
        TransactionService.findTransactionByUserId(req, res)
    }
}