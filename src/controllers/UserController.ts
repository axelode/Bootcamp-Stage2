import UserService from "../services/UserService"
import { Request, Response } from "express"

export default new class UserController {
    find(req: Request, res: Response) {
        UserService.find(req, res)
    }

    findById(req: Request, res: Response) {
        UserService.findById(req, res)
    }
    
    addUser(req: Request, res: Response) {
        UserService.addUser(req, res)
    }

    updateUser(req: Request, res: Response) {
        UserService.updateUser(req, res)
    }
    
    deleteUser(req: Request, res: Response) {
        UserService.deleteUser(req, res)
    }
}