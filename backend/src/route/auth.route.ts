import { Router } from "express";

const authRouter = Router();

import { authenticationMiddleware, validationMiddleware } from "../middleware";
import { loginSchema, signupSchema } from "../validators/auth.validator";

import { userLoginController, userRegistrationController } from "../controller";

// @POST - /api/v1/users/login
authRouter.post(
  "/login",
  validationMiddleware(loginSchema),
  userLoginController
);

// @POST - /api/v1/users/register
authRouter.post(
  "/register",
  validationMiddleware(signupSchema),
  userRegistrationController
);

authRouter.get("/me", authenticationMiddleware, (req, res) => {
  res.json({ data: res.locals.user });
});

export default authRouter;
