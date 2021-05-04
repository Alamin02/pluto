import express = require("express");
import { body } from "express-validator";
import {
  createFeaturedProductImageController,
  getAllFeaturedProductsImagesController,
  getSingleFeaturedProductImageController,
  deleteFeaturedProductImageController,
} from "../controller";
import { authenticationMiddleware, imageUpload } from "../middleware";

const router = express.Router();

// Create featured product images list
router.post(
  "/",
  imageUpload.array("featuredProductImages", 4),
  createFeaturedProductImageController
);

// Get all featured product images list
router.get(
  "/",
  authenticationMiddleware,
  getAllFeaturedProductsImagesController
);

// Get a particular featured product image
router.get(
  "/:imageId",
  authenticationMiddleware,
  getSingleFeaturedProductImageController
);

// delete a particular featured product image
router.delete(
  "/:originalName/:imageId/:productId",
  deleteFeaturedProductImageController
);

export default router;
