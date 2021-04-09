import express = require("express");
import { body } from "express-validator";
import {
  createOrderController,
  getAllOrdersController,
  getSingleOrderController,
  updateSingleOrderController,
  deleteOrderController,
} from "../controller";
import { authenticationMiddleware } from "../middleware";

const router = express.Router();

// Get all orders list ***
router.get("/:userId", getAllOrdersController);

// Create a order
router.post(
  "/",
  [
    body("paymentMethod")
      .not()
      .isEmpty()
      .withMessage("PaymentMethod can not be empty"),
  ],
  createOrderController
);

// Get a particular order
router.get("/:orderId", getSingleOrderController);

// Update order
router.put(
  "/:orderId",

  [
    body("title").not().isEmpty().withMessage("Blog title must not be empty"),
    body("author").not().isEmpty().withMessage("Author can not be empty"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Blog description can not be empty"),
  ],
  updateSingleOrderController
);

// Delete order
router.delete("/:orderId", deleteOrderController);

export default router;
