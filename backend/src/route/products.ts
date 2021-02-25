import express = require("express");
import { body } from "express-validator";

const router = express.Router();

import {
  createProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
} from "../controller";
import { authenticationMiddleware } from "../middleware";

// Get all products list
router.get("/", authenticationMiddleware, getAllProductsController);

// Create product
router.post(
  "/",
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
  createProductController
);

// Get a particular product
router.get("/:productId", getProductController);

// Update product
router.put("/:productId", authenticationMiddleware, updateProductController);

// Delete a product
router.delete("/:productId", authenticationMiddleware, deleteProductController);

export default router;
