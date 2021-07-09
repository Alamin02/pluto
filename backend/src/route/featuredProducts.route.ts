import { Router } from "express";

import {
  authenticationMiddleware,
  imageUpload,
  validationMiddleware,
} from "../middleware";

import {
  createFeaturedProductController,
  getFeaturedProductsController,
  deleteFeaturedProductController,
} from "../controller";

import { createCarouselSchema } from "../validators/featuredProducts.validator";

const featuredProductRouter = Router();

featuredProductRouter
  .route("/")
  .get(getFeaturedProductsController)
  .post(
    authenticationMiddleware,
    imageUpload.single("featuredProductImage"),
    validationMiddleware(createCarouselSchema),
    createFeaturedProductController
  );

featuredProductRouter
  .route("/:productId")
  .delete(authenticationMiddleware, deleteFeaturedProductController);

export default featuredProductRouter;
