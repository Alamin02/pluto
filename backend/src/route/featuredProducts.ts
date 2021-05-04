import express = require("express");
import { body } from "express-validator";

const router = express.Router();

import {
  getAllFeaturedProductsController,
  createFeaturedProductController,
  getFeaturedProductController,
  updateFeaturedProductController,
  deleteFeaturedProductController,
} from "../controller";

import { authenticationMiddleware, imageUpload } from "../middleware";

// Get all featured products list
router.get("/", getAllFeaturedProductsController);

// Create featured product
router.post(
  "/",
  imageUpload.array("featuredProductImages", 4),
  authenticationMiddleware,
  [
    body("name").not().isEmpty().withMessage("Product name can not be empty"),
    body("price").not().isEmpty().withMessage("Product price can not be empty"),
    body("summary")
      .not()
      .isEmpty()
      .withMessage("Product summary can not be empty"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Product description can not be empty"),

    body("categoryId")
      .not()
      .isEmpty()
      .withMessage("categoryId can not be empty"),
  ],
  createFeaturedProductController
);

// Get a particular featured product
router.get("/:featuredProductId", getFeaturedProductController);

// Update featured product
router.put(
  "/:featuredProductId",
  authenticationMiddleware,
  [
    body("name").not().isEmpty().withMessage("Product name can not be empty"),
    body("price").not().isEmpty().withMessage("Product price can not be empty"),
    body("summary")
      .not()
      .isEmpty()
      .withMessage("Product summary can not be empty"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Product description can not be empty"),
  ],
  updateFeaturedProductController
);

// Delete a featured product
router.delete(
  "/:featuredProductId&:productId",
  authenticationMiddleware,
  deleteFeaturedProductController
);

export default router;
