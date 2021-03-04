import express = require("express");
import { body } from "express-validator";

const router = express.Router();

import {
  createProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
  uploadImageController,
} from "../controller";

import { authenticationMiddleware, imageUpload } from "../middleware";

// Get all products list
router.get("/", getAllProductsController);

// Create product
router.post(
  "/",

  // authenticationMiddleware,

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
  createProductController
);

// Get a particular product
router.get("/:productId", getProductController);

// Update product
router.put(
  "/:productId",
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
  updateProductController
);

// Delete a product
router.delete("/:productId", authenticationMiddleware, deleteProductController);

// Upload a image
router.post("/productImage", imageUpload, uploadImageController);

export default router;
