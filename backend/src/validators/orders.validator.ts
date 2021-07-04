import Joi from "joi";

export const createOrderSchema = Joi.object({
  paymentMethod: Joi.string().required(),
});

export const updateOrderSchema = Joi.object({
  user: Joi.string(),
  orderedProducts: Joi.string(),
  status: Joi.string(),
  paymentMethod: Joi.string(),
  address: Joi.string(),
});
