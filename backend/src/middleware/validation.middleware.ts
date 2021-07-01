import express from "express";
import Joi from "joi";

export const validationMiddleware = (validator: Joi.ObjectSchema) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { error } = validator.validate(req.body);

    if (error) {
      return res.json({
        success: false,
        error: error.details[0].message,
      });
    }

    next();
  };
};
