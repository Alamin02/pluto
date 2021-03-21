import express = require("express");
import { body } from "express-validator";
import {
  getAllProductsImagesController,
  getSingleImageController,
  deleteProductImageController,
  createProductImageController,
} from "../controller";
import { authenticationMiddleware, imageUpload } from "../middleware";

const router = express.Router();

// Get all product images list
router.post(
  "/",
  imageUpload.array("productImages", 4),
  createProductImageController
);

// Get all product images list
router.get("/", getAllProductsImagesController);

// Get a particular product image
router.get("/:imageId", getSingleImageController);

// delete a particular product image
router.delete("/:imageId", deleteProductImageController);

export default router;
