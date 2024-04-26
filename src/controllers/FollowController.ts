import { Request, Response } from "express"
import FollowService from "../services/FollowService"

export default new class FollowController {
    Follow(req: Request, res: Response) {
        FollowService.Follow(req, res)
    }
}