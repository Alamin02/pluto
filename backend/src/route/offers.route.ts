import express = require("express");
const offersRouter = express.Router();

import {
  getAllOffersController,
  getSingleOfferController,
  createOfferController,
  updateOfferController,
  deleteOfferController,
} from "../controller";

import {
  authenticationMiddleware,
  imageUpload,
  validationMiddleware,
} from "../middleware";

import {
  createOfferSchema,
  updateOfferSchema,
} from "../validators/offers.validator";

// get all offers
//create offers
offersRouter
  .route("/")
  .get(getAllOffersController)
  .post(
    imageUpload.array("offerImages", 4),
    authenticationMiddleware,
    validationMiddleware(createOfferSchema),
    createOfferController
  );

// get single offers
// update single offer
// delete4 single offer
offersRouter
  .route("/:offerId")
  .get(getSingleOfferController)
  .put(
    authenticationMiddleware,
    validationMiddleware(updateOfferSchema),
    updateOfferController
  )
  .delete(authenticationMiddleware, deleteOfferController);

export default offersRouter;
