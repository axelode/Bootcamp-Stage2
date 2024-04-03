import { Request, Response } from "express"
import { addCategory } from "../utils/CategoryUtil"
import { PrismaClient } from "@prisma/client"
import cloudinary  from "../config"
import * as fs from "fs"

const prisma = new PrismaClient()

export default new class CategoryService {
    private readonly CategoryRepo = prisma.tb_category

    async addCategory(req: Request, res: Response): Promise<Response>  {
        try{
            const body = req.body
            const { error } = addCategory.validate(body)
            if(error) return res.status(400).json(error.message)

            const image = req.file
            if(!image) return res.status(400).json({ messages: "No file uploaded!" })

            const cloudinaryUpload = await cloudinary.uploader.upload(image.path, {
                folder: "stage_2"
            })

            fs.unlinkSync(image.path)

            const newCategory = await this.CategoryRepo.create({
                data: {
                    category: body.category,
                    type: body.type,
                    image: cloudinaryUpload.secure_url
                }
            })

            return res.status(201).json(newCategory)
        }catch(err) {
            return res.status(500).json(err)
        }
    }
}