import * as Joi from "joi"

export const addCategory = Joi.object({
    category_name: Joi.string().required(),
    type: Joi.string().required(),
    image: Joi.string()
})