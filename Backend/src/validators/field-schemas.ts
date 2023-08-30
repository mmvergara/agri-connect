import Joi from "joi";

export const email = Joi.string().email().required();
export const password = Joi.string().min(6).max(100).required();
export const username = Joi.string().min(3).max(20).required();
export const message = Joi.string().min(1).max(1000).required();
