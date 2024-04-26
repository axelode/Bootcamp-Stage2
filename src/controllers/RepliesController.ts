import { Request, Response } from "express"
import RepliesService from "../services/RepliesService"

export default new class RepliesController {
    AddReplies(req: Request, res: Response) {
        RepliesService.AddReplies(req, res)
    }
    
    UpdateReplies(req: Request, res: Response) {
        RepliesService.UpdateReplies(req, res)
    }
    
    DeleteReplies(req: Request, res: Response) {
        RepliesService.DeleteReplies(req, res)
    }
}