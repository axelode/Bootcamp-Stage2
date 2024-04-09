import TransactionService from "../services/TransactionService"
import { Request, Response } from "express"

export default new class TransactionController {
    addTransaction(req: Request, res: Response) {
        TransactionService.addTransaction(req, res)
    }

    findTransactionByUserId(req: Request, res: Response) {
        TransactionService.findTransactionByUserId(req, res)
    }

    findLastMonthTransaction(req: Request, res: Response) {
        TransactionService.findLastMonthTransaction(req, res)
    }
    
    findThisMonthTransaction(req: Request, res: Response) {
        TransactionService.findThisMonthTransaction(req, res)
    }
    
    findFutureTransaction(req: Request, res: Response) {
        TransactionService.findFutureTransaction(req, res)
    }
}