import { Router } from "express";

const settingsRouter = Router();

import { getSettings, updateSettings } from "../controller/settings.controller";

// @POST - /api/v1/settings
settingsRouter.route("/").get(getSettings).put(updateSettings);

export default settingsRouter;
