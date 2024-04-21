import * as Joi from "joi"

export const register = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
    .pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&_])[A-Za-z\d@#$%&_]{8,}$/))
    .message("Password minimum 8 characters in length. At least one uppercase letter. At least one lowercase letter. At least one digit. At least one special character (@#$%&_)"),
    full_name: Joi.string().required()
})

export const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})