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

// Get all product images list
router.post(
  "/",
  imageUpload.array("featuredProductImages", 4),
  createFeaturedProductImageController
);

// Get all product images list
router.get("/", getAllFeaturedProductsImagesController);

// Get a particular product image
router.get("/:imageId", getSingleFeaturedProductImageController);

// delete a particular product image
router.delete("/:imageId", deleteFeaturedProductImageController);

export default router;
