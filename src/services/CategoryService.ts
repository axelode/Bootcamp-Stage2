import { Request, Response } from "express"
import { addCategory } from "../utils/CategoryUtil"
import { PrismaClient } from "@prisma/client"
import cloudinary  from "../cloudinaryConfig"
import * as fs from "fs"

const prisma = new PrismaClient()

export default new class CategoryService {
    private readonly CategoryRepo = prisma.tb_category

    async addCategory(req: Request, res: Response): Promise<Response>  {
        try{
            const isAdmin: boolean = res.locals.login_session.isAdmin

            if(!isAdmin) return res.status(400).json({ message: "You're Not an Admin!" })

            const body = req.body

            const { error, value } = addCategory.validate(body)

            if(error) return res.status(400).json({ message: "Input Validation Error!" })

            const image = req.file

            if(!image) return res.status(400).json({ messages: "No File Uploaded!" })

            const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
                folder: "category"
            })

            fs.unlinkSync(image.path)

            const newCategory = await this.CategoryRepo.create({
                data: {
                    category_name: value.category_name,
                    type: value.type,
                    image: cloudinaryUpload.secure_url
                }
            })

            return res.status(201).json(newCategory)
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }

    async findCategory(req: Request, res: Response): Promise<Response> {
        try{
            const thisCategory = await this.CategoryRepo.findMany()

            if(!thisCategory) return res.status(404).json({ message: "Category Not Found!" })

            return res.status(201).json(thisCategory)
        }catch(err) {
            return res.status(500).json({ message: err })
        }
    }
}