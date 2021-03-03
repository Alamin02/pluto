import express = require("express");
import { body } from "express-validator";
const router = express.Router();

import {
  getAllOffersController,
  createOfferController,
  updateOfferController,
  deleteOfferController,
} from "../controller";

import { authenticationMiddleware } from "../middleware";

// get all offers
router.get("/", getAllOffersController);

// create offer
router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("Name must not be empty"),
    body("discount").not().isEmpty().withMessage("price must not be empty"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("description must not be empty"),
  ],
  authenticationMiddleware,
  createOfferController
);

// update offer
router.put("/:offerId", authenticationMiddleware, updateOfferController);

// delete offer
router.delete("/:offerId", authenticationMiddleware, deleteOfferController);

export default router;
