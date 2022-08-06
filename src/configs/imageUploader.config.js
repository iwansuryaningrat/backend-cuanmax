import multer from "multer";

// Image Uploader Setup
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() + "-" + file.originalname.replace(/\s/g, "-")
    );
  },
});

const imageFileFilter = (req, file, cb) => {
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

export { imageStorage, imageFileFilter };

// export default { imageStorage, imageFilter };
