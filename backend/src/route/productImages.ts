import express = require("express");
import { body } from "express-validator";
import {
  getAllProductsImagesController,
  getSingleImageController,
} from "../controller";
import { authenticationMiddleware } from "../middleware";

const router = express.Router();

// Get all product images list
router.get("/", getAllProductsImagesController);

// Get a particular product image
router.get("/:imageId", getSingleImageController);

export default router;
