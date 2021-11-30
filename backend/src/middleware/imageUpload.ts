import multer = require("multer");
import path from "path";
const cloudinary = require("cloudinary").v2;
import {
  CloudinaryStorage,
  Options,
  OptionCallback,
} from "multer-storage-cloudinary";
import express = require("express");
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

declare interface cloudinaryOptions extends Options {
  params: {
    folder: string;
    public_id?: OptionCallback<string>;
  };
}

const multerOptions: cloudinaryOptions = {
  cloudinary: cloudinary,
  params: {
    folder: "product-images",
    // format: async (req, file) => "png", // supports promises as well
    public_id: (req: express.Request, file: any) =>
      // file.fieldname + "-" + Date.now() + path.extname(file.originalname),
      file.fieldname + "-" + Date.now(),
  },
};

const cloudinaryStorage = new CloudinaryStorage(multerOptions);

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    // if validation failed then generate error
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file), false);
  }
};

export const imageUpload = multer({
  storage: cloudinaryStorage,
  fileFilter,
});
