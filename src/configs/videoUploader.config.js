const multer = require("multer");

// Video Uploader Setup
exports.videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/videos");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.replace(/\s/g, "-") + "-" + new Date().getTime()
    );
  },
});

exports.videoFilter = (req, file, cb) => {
  if (
    file.mimetype === "video/mpeg" ||
    file.mimetype === "video/x-msvideo" ||
    file.mimetype === "video/3gpp" ||
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/webm"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
