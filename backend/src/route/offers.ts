import express = require("express");
import { body } from "express-validator";
const router = express.Router();

import {
  getAllOffersController,
  getSingleOfferController,
  createOfferController,
  updateOfferController,
  deleteOfferController,
} from "../controller";

import { authenticationMiddleware, imageUpload } from "../middleware";

// get all offers
router.get("/", getAllOffersController);

// create offer
router.post(
  "/",
  imageUpload.array("offerImages", 4),
  authenticationMiddleware,
  [
    body("name").not().isEmpty().withMessage("Name must not be empty"),
    body("discount").not().isEmpty().withMessage("discount must not be empty"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("description must not be empty"),
  ],
  createOfferController
);

// get all offers
router.get("/:offerId", getSingleOfferController);

// update offer
router.put("/:offerId", authenticationMiddleware, updateOfferController);

// delete offer
router.delete("/:offerId", authenticationMiddleware, deleteOfferController);

export default router;
