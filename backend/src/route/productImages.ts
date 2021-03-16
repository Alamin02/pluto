import express = require("express");
import { body } from "express-validator";
import {
  getAllProductsImagesController,
  getSingleImageController,
  deleteProductImageController,
} from "../controller";
import { authenticationMiddleware } from "../middleware";

const router = express.Router();

// Get all product images list
router.get("/", getAllProductsImagesController);

// Get a particular product image
router.get("/:imageId", getSingleImageController);

// delete a particular product image
router.delete("/:imageId", deleteProductImageController);

export default router;
