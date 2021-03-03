import multer = require("multer");
const path = require("path");

//multer setup for uploading product image
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/productUpload");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
export let imageUpload = multer({
  storage: storage,
}).single("productImage");
