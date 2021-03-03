import express = require("express");
import { body } from "express-validator";

import { authenticationMiddleware } from "../middleware";
import {
  createAddressController,
  getAllAddressesController,
  getAddressController,
  updateAddressController,
  deleteAddressController,
} from "../controller";

const router = express.Router();

// Get all addresses list
router.get("/", authenticationMiddleware, getAllAddressesController);

// Create address
router.post(
  "/",
  [
    body("division")
      .not()
      .isEmpty()
      .withMessage("Division name can not be empty"),
    body("district")
      .not()
      .isEmpty()
      .withMessage("District name can not be empty"),
    body("city").not().isEmpty().withMessage("City name can not be empty"),
    body("address")
      .not()
      .isEmpty()
      .withMessage("Full address can not be empty"),
  ],
  authenticationMiddleware,
  createAddressController
);

// Get a particular address
router.get("/:addressId", authenticationMiddleware, getAddressController);

// Update address
router.put(
  "/:addressId",
  [
    body("division")
      .not()
      .isEmpty()
      .withMessage("Division name can not be empty"),
    body("district")
      .not()
      .isEmpty()
      .withMessage("District name can not be empty"),
    body("city").not().isEmpty().withMessage("City name can not be empty"),
    body("address")
      .not()
      .isEmpty()
      .withMessage("Full address can not be empty"),
  ],
  authenticationMiddleware,
  updateAddressController
);

// Delete an address
router.delete("/:addressId", authenticationMiddleware, deleteAddressController);

export default router;
