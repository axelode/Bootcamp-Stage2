import { Request,Response } from "express"
import UserService from "../services/UserService"

export default new class UserController {
    FindUserAll(req: Request, res: Response) {
        UserService.FindUserAll(req, res)
    }

    FindUserById(req: Request, res: Response) {
        UserService.FindUserById(req, res)
    }

    FindUserByName(req: Request, res: Response) {
        UserService.FindUserByName(req, res)
    }
    
    UpdateProfile(req: Request, res: Response) {
        UserService.UpdateProfile(req, res)
    }

    UpdateProfilePicture(req: Request, res: Response) {
        UserService.UpdateProfilePicture(req, res)
    }

    UpdatePassword(req: Request, res: Response) {
        UserService.UpdatePassword(req, res)
    }

    GetSuggestedUser(req: Request, res: Response) {
        UserService.GetSuggestedUser(req, res)
    }
    
    DeleteUser(req: Request, res: Response) {
        UserService.DeleteUser(req, res)
    }
}