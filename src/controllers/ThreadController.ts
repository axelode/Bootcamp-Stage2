import { Request, Response } from "express"
import ThreadService from "../services/ThreadService"

export default new class ThreadController {
    FindThreadAll(req: Request, res: Response) {
        ThreadService.FindThreadAll(req, res)
    }

    FindThreadById(req: Request, res: Response) {
        ThreadService.FindThreadById(req, res)
    }

    AddThread(req: Request, res: Response) {
        ThreadService.AddThread(req, res)
    }
    
    UpdateThread(req: Request, res: Response) {
        ThreadService.UpdateThread(req, res)
    }

    DeleteThread(req: Request, res: Response) {
        ThreadService.DeleteThread(req, res)
    }
}