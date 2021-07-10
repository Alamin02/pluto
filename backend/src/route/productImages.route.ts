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

// @GET //v1/api/product-images
// Get all product images list
// @POST //v1/api/product-images
// create product images list
router
  .route("/")
  .get(getAllProductsImagesController)
  .post(imageUpload.array("productImages", 4), createProductImageController);

// @POST //v1/api/product-images/:productId
// Get a particular product image
// delete a particular product image
router
  .route("/:productImageId")
  .get(getSingleImageController)
  .delete(deleteProductImageController);

export default router;
