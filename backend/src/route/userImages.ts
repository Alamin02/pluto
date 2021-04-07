import express = require("express");
import { imageUpload } from "../middleware";
import { createUserImageController } from "../controller";
const router = express.Router();

// create user image
// POST
router.post("/", imageUpload.array("userImage", 1), createUserImageController);

export default router;
