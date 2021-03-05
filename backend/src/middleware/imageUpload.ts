import multer = require("multer");
const path = require("path");

//multer setup for uploading product image
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images"));
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// fileFilter: function (req, file, callback) {
//   var ext = path.extname(file.originalname);
//   if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
//     return callback(new Error("Only images are allowed"));
//   }
//   callback(null, true);
// },

export const imageUpload = multer({
  storage: storage,
}).array("productImage", 4);
