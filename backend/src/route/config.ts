import express = require("express");

const router = express.Router();

import { logoConfigController } from "../controller";
router.post("/logo", logoConfigController);

export default router;
