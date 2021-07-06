import { Router } from "express";

import {
  authenticationMiddleware,
  imageUpload,
  validationMiddleware,
} from "../middleware";

import {
  createCarouselController,
  getCarouselsController,
  deleteCarouselController,
} from "../controller";

import { createCarouselSchema } from "../validators/carousels.validator";

const carouselRouter = Router();

carouselRouter
  .route("/")
  .get(getCarouselsController)
  .post(
    authenticationMiddleware,
    imageUpload.single("carouselImage"),
    validationMiddleware(createCarouselSchema),
    createCarouselController
  );

carouselRouter
  .route("/:carouselId")
  .delete(authenticationMiddleware, deleteCarouselController);

export default carouselRouter;
