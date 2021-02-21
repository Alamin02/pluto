import express = require("express");
const router = express.Router();
import { body } from "express-validator";

import { authenticationMiddleware } from "../middleware";


const { userLogin, userRegistration, users } = require("../controller/auth");

// @POST - /login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email address"),
    body("password").not().isEmpty().withMessage("Password must not be empty"),
  ],
  userLogin
);

// @POST - /register
router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Name must not be empty"),
    body("email").isEmail().withMessage("Invalid Email address"),
    body("password").not().isEmpty().withMessage("Password must not be empty"),
  ],
  userRegistration
);

// @GET - /
router.get(
  "/",
  authenticationMiddleware,

);

export default router;
