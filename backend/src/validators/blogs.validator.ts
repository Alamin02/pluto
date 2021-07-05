import Joi from "joi";

export const createBlogSchema = Joi.object({
  title: Joi.string().min(10).required(),
  author: Joi.string().min(3).required(),
  description: Joi.string().min(20).required(),
  blogImage: Joi.string().allow("").optional(),
});
export const updateBlogSchema = Joi.object({
  title: Joi.string().min(10).required(),
  author: Joi.string().min(3).required(),
  description: Joi.string().min(20).required(),
  blogImage: Joi.string().allow("").optional(),
});
