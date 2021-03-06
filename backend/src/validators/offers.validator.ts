import Joi from "joi";

export const createOfferSchema = Joi.object({
  name: Joi.string().required(),
  discount: Joi.number().required(),
  description: Joi.string().required(),
}).options({ allowUnknown: true });

export const updateOfferSchema = Joi.object({
  name: Joi.string().required(),
  discount: Joi.number().required(),
  description: Joi.string().required(),
}).options({ allowUnknown: true });
