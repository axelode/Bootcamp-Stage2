import * as Joi from "joi"

export const addCategory = Joi.object({
    category: Joi.string().required(),
    type: Joi.string().required(),
    image: Joi.string().required()
})