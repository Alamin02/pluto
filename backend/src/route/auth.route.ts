import { Router } from "express";

const authRouter = Router();

import { userLoginController, userRegistrationController } from "../controller";
import { authenticationMiddleware, validationMiddleware } from "../middleware";
import { loginSchema, signupSchema } from "../validators/auth.validator";

// @POST - /api/v1/auth/login
authRouter.post(
  "/login",
  validationMiddleware(loginSchema),
  userLoginController
);

// @POST - /api/v1/auth/register
authRouter.post(
  "/register",
  validationMiddleware(signupSchema),
  userRegistrationController
);

// @GET - /api/v1/auth/me
authRouter.get("/me", authenticationMiddleware, (req, res) => {
  res.json({ data: res.locals.user });
});

export default authRouter;
