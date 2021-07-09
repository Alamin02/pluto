import express = require("express");
const router = express.Router();
import {
  getAllOfferImagesController,
  createOfferImageController,
  updateOfferImageController,
  deleteOfferImageController,
  CreateOfferImageEditModalController,
} from "../controller";
import { authenticationMiddleware, imageUpload } from "../middleware";

// get offer Images
//GET /api/v1/offer-image/
router.get("/", getAllOfferImagesController);

// create offer Image
//POST /api/v1/offer-image/
router.post(
  "/edit",
  imageUpload.array("offerImages", 4),
  CreateOfferImageEditModalController
);

router.post(
  "/",
  imageUpload.array("offerImages", 4),
  createOfferImageController
);

// update offer Image
//PUT /api/v1/offer-image/:offerImageId
router.put("/:offerImageId", updateOfferImageController);

// delete offer Image
//DELETE /api/v1/offer/image/:offerImageId
router.delete("/:offerImageId", deleteOfferImageController);

export default router;
