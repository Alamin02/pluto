import Joi from "joi";

export const createOfferSchema = Joi.object({
  name: Joi.string().required(),
  discount: Joi.string().required(),
  description: Joi.string().required(),
});

export const updateOfferSchema = Joi.object({
  name: Joi.string().required(),
  discount: Joi.string().required(),
  description: Joi.string().required(),
});
