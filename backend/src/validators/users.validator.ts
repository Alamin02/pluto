import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  role: Joi.string(),
  password: Joi.string().email().min(6).required(),
  addresses: Joi.string(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string(),
  role: Joi.string(),
});

export const updateUserPasswordSchema = Joi.object({
  password: Joi.string(),
});
