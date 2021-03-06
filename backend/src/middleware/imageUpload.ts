import multer = require("multer");
const path = require("path");

//multer setup for uploading product image
var storage = multer.diskStorage({
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
  storage: storage,
  fileFilter,
}).array("productImages", 4);
