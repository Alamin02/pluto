import express = require("express");

const router = express.Router();

import { createFeaturedProductController } from "../controller";

import { authenticationMiddleware, imageUpload } from "../middleware";

// Get all featured products list
router.get("/");

// Create featured product
router.post(
  "/",
  imageUpload.array("featuredProductImages", 4),
  authenticationMiddleware,
  createFeaturedProductController
);

export default router;
