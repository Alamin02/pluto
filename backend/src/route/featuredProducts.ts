import express = require("express");

const router = express.Router();

import {
  createFeaturedProductController,
  getAllFeaturedProductsController,
  deleteFeaturedProductController,
} from "../controller";

import { authenticationMiddleware, imageUpload } from "../middleware";

// delete featured product
router.delete(
  "/:Id",
  authenticationMiddleware,
  deleteFeaturedProductController
);

// Get all featured products list
router.get("/", getAllFeaturedProductsController);

// Create featured product
router.post(
  "/",
  imageUpload.array("featuredProductImages", 4),
  authenticationMiddleware,
  createFeaturedProductController
);

export default router;
