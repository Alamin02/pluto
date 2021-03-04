import express = require("express");
const router = express.Router();

import {
  uploadProductImageController
} from "../controller";

import { imageUpload } from "../middleware";

// Upload a product image
router.post(
  "/uploadProductImage",
  imageUpload,
  uploadProductImageController
);

export default router;