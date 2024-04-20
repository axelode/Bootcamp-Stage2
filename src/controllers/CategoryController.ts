import CategoryService from "../services/CategoryService"
import { Request, Response } from "express"

export default new class CategoryController {
    addCategory(req: Request, res: Response) {
        CategoryService.addCategory(req, res)
    }

    findCategory(req: Request, res: Response) {
        CategoryService.findCategory(req, res)
    }
}