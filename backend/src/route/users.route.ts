import express = require("express");
import { body } from "express-validator";

import { authenticationMiddleware, validationMiddleware } from "../middleware";

import {
  getUsersController,
  getUserController,
  updateUserAdminPanelController,
  deleteUserController,
  updateUserPasswordController,
  updateUserFrontendController,
  getProfileController,
} from "../controller";

const userRouter = express.Router();

userRouter
  .route("/")
  // @GET - /api/v1/users/
  .get(getUsersController);

// @PUT - /api/v1/users/:userId
userRouter.put(
  "/update/:userId",
  [
    body("name").not().isEmpty().withMessage("Name must not be empty"),
    body("email").isEmail().withMessage("Invalid Email address"),
  ],
  authenticationMiddleware,
  updateUserFrontendController
);

// @PUT - /api/v1/users/:userId
userRouter.put(
  "/admin/:userId",
  [
    body("name").not().isEmpty().withMessage("Name must not be empty"),
    body("email").isEmail().withMessage("Invalid Email address"),
  ],
  authenticationMiddleware,
  updateUserAdminPanelController
);

// @GET - /api/v1/users/
userRouter.get("/", getUsersController);

userRouter.get("/profile", authenticationMiddleware, getProfileController);

// @GET - /api/v1/user/
userRouter.get(
  "/:\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b",
  getUserController
);

// @PUT - /api/v1/users/
userRouter.put("/:userId", updateUserPasswordController);

// @DELETE - /api/v1/users/:userId
userRouter.delete("/:userId", authenticationMiddleware, deleteUserController);

export default userRouter;
