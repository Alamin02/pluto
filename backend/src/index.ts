import express = require("express");
import multer = require("multer");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import cors from "cors";
import { connectDatabase } from "./utils/connect-db";

const debug = require("debug")("app");

import router from "./route";

const app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routers
app.use("/api/v1", router);

connectDatabase();

app.use(function (
  err: any,
  req: express.Request,
  res: express.Response,
  next: Function
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  if (err instanceof multer.MulterError) {
    res.status(400).json({
      error:
        "For creating Product key name must be productImages and For creating Blog key name must be blogImage, and, only image file and maximum 4 images can be uploaded",
    });
  } else {
    res
      .status(err.status || 500)
      .json({ success: false, error: "Something went wrong" });
  }
});

const port = 4000;

app.listen(port, () => {
  debug(`Backend app listening at http://localhost:${port}`);
});
