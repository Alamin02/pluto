import express = require("express");
import { body } from "express-validator";

import { authenticationMiddleware, imageUpload } from "../middleware";

import {
  createCarouselController,
  getCarouselsController,
  deleteCarouselController,
} from "../controller";

const router = express.Router();

// @POST - /carousels
// Create carousel
router.post(
  "/",
  [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Carousel title can not be empty"),
    body("summary")
      .not()
      .isEmpty()
      .withMessage("Carousel summary can not be empty"),
  ],
  authenticationMiddleware,
  createCarouselController
);

// @GET - /carousels
// Get all carousel
router.get("/", getCarouselsController);

// @DELETE - /carousels/:carouselId
// Delete a carousel
router.delete(
  "/:carouselId",
  authenticationMiddleware,
  deleteCarouselController
);

export default router;
