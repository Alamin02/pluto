import Joi from "joi";

export const createCarouselSchema = Joi.object({
  title: Joi.string().required(),
  summary: Joi.string().required(),
}).options({ allowUnknown: true });
