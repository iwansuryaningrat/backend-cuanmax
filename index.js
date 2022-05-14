// Express REST server
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
// Load .env file
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Image Uploader Setup
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/foto");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
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

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);

// MongoDB Connection
const db = require("./src/services/db.connect");
db.connect();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Cuanmax REST API",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port http//localhost:${process.env.PORT}`);
});

// Routers
require("./src/routes/playlists.routes")(app); // Playlist Router
require("./src/routes/profiles.routes")(app); // Profiles Router
require("./src/routes/videos.routes")(app); // Videos Router
