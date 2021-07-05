import Joi from "joi";

export const createAddressSchema = Joi.object({
  division: Joi.string().required(),
  district: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
  user: Joi.string().required(),
});

export const updateAddressSchema = Joi.object({
  division: Joi.string(),
  district: Joi.string(),
  city: Joi.string(),
  address: Joi.string(),
  user: Joi.string(),
});
