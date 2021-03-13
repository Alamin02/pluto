import multer = require("multer");
import path from "path";
const cloudinary = require("cloudinary").v2;
import { CloudinaryStorage } from "multer-storage-cloudinary";

//multer setup for uploading product image
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "public", "images"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "product-images",
    // format: async (req, file) => "png", // supports promises as well
    public_id: (req, file) =>
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
  },
});

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
}).array("productImages", 4);
