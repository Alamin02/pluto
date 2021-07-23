import express = require("express");
import { imageUpload, authenticationMiddleware } from "../middleware";
import {
  createUserImageController,
  getUseeImagesController,
} from "../controller";
const router = express.Router();

// create user image
// POST
router.get("/", getUseeImagesController);
router.post(
  "/",
  authenticationMiddleware,
  imageUpload.single("userImage"),
  createUserImageController
);

export default router;
