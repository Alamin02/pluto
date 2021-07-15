import express = require("express");
import {
  createImageController,
  deleteImageController,
  getImageController,
} from "../controller";
import { imageUpload } from "../middleware";

const imageRouter = express.Router();

imageRouter
  .route("/")
  .get(getImageController)
  .post(imageUpload.single("image"), createImageController);

imageRouter.route("/:imageId").delete(deleteImageController);

export default imageRouter;
