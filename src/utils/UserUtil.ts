import Joi from "joi"

export const updateProfile = Joi.object({
    full_name: Joi.string().allow(""),
    bio: Joi.string().allow("")
})

export const updateProfilePicture = Joi.object({
    profile_picture: Joi.string().required()
})

export const updatePassword = Joi.object({
    password: Joi.string().required()
    .pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%&_])[A-Za-z\d@#$%&_]{8,}$/))
    .message("Password minimum 8 characters in length. At least one uppercase letter. At least one lowercase letter. At least one digit. At least one special character (@#$%&_)")
})