import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.string().required(),
  summary: Joi.string().required(),
  description: Joi.string().required(),
  categoryId: Joi.string(),
  offerId: Joi.string(),
}).options({ allowUnknown: true });

export const updateProductSchema = Joi.object({
  name: Joi.string(),
  price: Joi.string(),
  summary: Joi.string(),
  description: Joi.string(),
  categoryId: Joi.string(),
  offerId: Joi.string(),
}).options({ allowUnknown: true });
