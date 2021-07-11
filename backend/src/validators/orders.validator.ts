import Joi from "joi";

export const createOrderSchema = Joi.object({
  user: Joi.object().required(),
  orderedProducts: Joi.array().required(),
  paymentMethod: Joi.string().required(),
  address: Joi.object().required(),
});

export const updateOrderSchema = Joi.object({
  user: Joi.string(),
  orderedProducts: Joi.string(),
  status: Joi.string(),
  paymentMethod: Joi.string(),
  address: Joi.string(),
});
