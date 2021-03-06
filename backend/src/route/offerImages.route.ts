import express = require("express");
const router = express.Router();
import {
  getAllOfferImagesController,
  createOfferImageController,
  deleteOfferImageController,
} from "../controller";
import { authenticationMiddleware, imageUpload } from "../middleware";

// get offer Images
//create offerImages
//GET /api/v1/offer-image/
router
  .route("/")
  .get(getAllOfferImagesController)
  .post(
    imageUpload.array("offerImages", 4),
    authenticationMiddleware,
    createOfferImageController
  );

// delete offer Image
//DELETE /api/v1/offer-image/:offerImageId
router
  .route("/:offerImageId")
  .delete(authenticationMiddleware, deleteOfferImageController);

export default router;
