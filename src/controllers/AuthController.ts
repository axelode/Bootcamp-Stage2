import { Request, Response } from "express"
import AuthService from "../services/AuthService"

export default new class AuthController {
    Register(req: Request, res: Response) {
        AuthService.Register(req, res)
    }

    Login(req: Request, res: Response) {
        AuthService.Login(req, res)
    }

    Check(req: Request, res: Response) {
        AuthService.Check(req, res)
    }
    
    Logout(req: Request, res: Response) {
        AuthService.Logout(req, res)
    }
}