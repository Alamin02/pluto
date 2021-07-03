import Joi from "joi";

export const createUserAdminSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  role: Joi.string().email().required(),
  password: Joi.string().email().min(6).required(),
  addresses: Joi.string(),
}).options({ allowUnknown: true });

export const updateUserAdminSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  phone: Joi.string(),
  role: Joi.string().email(),
}).options({ allowUnknown: true });
