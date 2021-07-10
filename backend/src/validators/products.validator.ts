import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  summary: Joi.string().required(),
  description: Joi.string().required(),
  categoryId: Joi.array().required(),
  offerId: Joi.string().allow("").optional(),
}).options({ allowUnknown: true });

export const updateProductSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  summary: Joi.string().required(),
  description: Joi.string().required(),
  categoryId: Joi.string().required(),
  offerId: Joi.string().allow("").optional(),
}).options({ allowUnknown: true });
