import express = require("express");
import { imageUpload, authenticationMiddleware } from "../middleware";
import { createCarouselImageController } from "../controller";

const router = express.Router();

// @POST - api/v1/carousel-image
// create carousel image
router.post(
  "/",
  authenticationMiddleware,
  imageUpload.single("carouselImage"),
  createCarouselImageController
);

export default router;
