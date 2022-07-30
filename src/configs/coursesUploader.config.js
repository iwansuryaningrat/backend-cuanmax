const multer = require("multer");

// Video Uploader Setup
exports.coursesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/courses");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() + "-" + file.originalname.replace(/\s/g, "-")
    );
  },
});

exports.coursesFilter = (req, file, cb) => {
  if (
    file.mimetype === "video/mpeg" ||
    file.mimetype === "video/x-msvideo" ||
    file.mimetype === "video/3gpp" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/webm" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
