import Joi from "joi"

export const addThread = Joi.object({
    content: Joi.string().required(),
    image: Joi.string().allow("")
})

export const updateThread = Joi.object({
    content: Joi.string().allow(""),
    image: Joi.string().allow("")
})