import multer = require("multer");
const path = require("path");

//multer setup for product image
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/product-image");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
export const uploadImage = multer({
  storage: storage,
}).single("productImage");
