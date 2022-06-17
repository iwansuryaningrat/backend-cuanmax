const multer = require("multer");

// Image Uploader Setup
exports.imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/foto");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.replace(/\s/g, "-") + "-" + new Date().getTime()
    );
  },
});

exports.imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
