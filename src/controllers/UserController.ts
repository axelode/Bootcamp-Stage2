import UserService from "../services/UserService"
import { Request, Response } from "express"

export default new class UserController {
    register(req: Request, res: Response) {
        UserService.register(req, res)
    }
    
    login(req: Request, res: Response) {
        UserService.login(req, res)
    }
}