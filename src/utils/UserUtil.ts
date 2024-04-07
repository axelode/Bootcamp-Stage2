import * as Joi from "joi"

export const register = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')).message("Password must contain at least 16 characters, and must contain at least one lowercase, one uppercase, and one number!"),
    full_name: Joi.string().required()
})

export const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})