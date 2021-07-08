import Joi from "joi";

export const createCarouselSchema = Joi.object({
  title: Joi.string().required(),
  productId: Joi.string().required(),
  featuredProductImage: Joi.optional(),
});
