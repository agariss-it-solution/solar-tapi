const Joi = require("joi");
const mongoose = require("mongoose");

const createBannerSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
});

const updateBannerSchema = Joi.object({
    title: Joi.string().min(2).max(100).optional(),
});
const createContactSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    number: Joi.string().pattern(/^[0-9]{10}$/).required(), // 10-digit number
    title: Joi.string().allow("").optional(),
    message: Joi.string().allow("").optional(),
});

const updateContactSchema = Joi.object({
    name: Joi.string().min(2).optional(),
    email: Joi.string().email().optional(),
    number: Joi.string().pattern(/^[0-9]{10}$/).optional(),
    title: Joi.string().allow("").optional(),
    message: Joi.string().allow("").optional(),
});
const isValidObjectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
};

const productCreateSchema = Joi.object({
    title: Joi.string().min(2).required(),
    description: Joi.string().min(5).required(),
});

const productUpdateSchema = Joi.object({
    title: Joi.string().min(2).optional(),
    description: Joi.string().min(5).optional(),
    id: Joi.string().custom(isValidObjectId).required(),
});

const productIdSchema = Joi.object({
    id: Joi.string().custom(isValidObjectId).required(),
});

module.exports = {
    createBannerSchema,
    updateBannerSchema,
    createContactSchema,
    updateContactSchema,
    productCreateSchema,
    productUpdateSchema,
    productIdSchema,
};
