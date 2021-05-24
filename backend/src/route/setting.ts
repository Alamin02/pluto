import express = require("express");

const router = express.Router();

import { logoSettingController } from "../controller";
router.post("/logo", logoSettingController);

export default router;
