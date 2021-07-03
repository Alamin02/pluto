import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string(),
}).options({ allowUnknown: true });

export const updateUserPasswordSchema = Joi.object({
  password: Joi.string(),
});
