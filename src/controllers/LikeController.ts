import { Request, Response } from "express"
import LikeService from "../services/LikeService"

export default new class LikeController {
    Like(req: Request, res: Response) {
        LikeService.Like(req, res)
    }
}