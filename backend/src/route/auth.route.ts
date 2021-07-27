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
  try {
    const user = res.locals.user;
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    return res.status(500).json("Something went wrong");
  }
});

export default authRouter;
