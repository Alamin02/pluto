import express = require("express");
import { body } from "express-validator";

import { authenticationMiddleware } from "../middleware";

import {
  userLoginController,
  userRegistrationController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from "../controller";

const router = express.Router();

// @POST - /api/v1/users/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email address"),
    body("password").not().isEmpty().withMessage("Password must not be empty"),
  ],
  userLoginController
);

// @POST - /api/v1/users/register
router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Name must not be empty"),
    body("email").isEmail().withMessage("Invalid Email address"),
    body("password").not().isEmpty().withMessage("Password must not be empty"),
  ],
  userRegistrationController
);

// @GET - /api/v1/users/
router.get("/", getUsersController);

router.get("/me", authenticationMiddleware, (req, res) => {
  res.json({ data: res.locals.user });
});

// @GET - /api/v1/user/
router.get("/:userId", getUserController);

// @PUT - /api/v1/users/:userId
router.put(
  "/:userId",
  [
    body("name").not().isEmpty().withMessage("Name must not be empty"),
    body("email").isEmail().withMessage("Invalid Email address"),
  ],
  authenticationMiddleware,
  updateUserController
);

// @DELETE - /api/v1/users/:userId
router.delete("/:userId", authenticationMiddleware, deleteUserController);

export default router;
