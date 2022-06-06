// Express REST server
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

// const bodyParser = require("body-parser");

// Load .env file
require("dotenv").config();

// Load File Configuration
const imageConfig = require("./src/configs/imageUploader.config");
const videoConfig = require("./src/configs/videoUploader.config");

const app = express();

// File Access Control
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  multer({
    storage: imageConfig.imageStorage,
    fileFilter: imageConfig.imageFilter,
  }).single("image")
);

app.use(
  multer({
    storage: videoConfig.videoStorage,
    fileFilter: videoConfig.videoFilter,
  }).single("video")
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
// require("./src/routes/playlists.routes")(app); // Playlist Router
require("./src/routes/users.routes")(app); // Users Router
// require("./src/routes/videos.routes")(app); // Videos Router
// require("./src/routes/subscribers.routes")(app); // Subscribers Router
// require("./src/routes/message.routes")(app); // Message Router
// require("./src/routes/pricing.routes")(app); // Pricing Router
// require("./src/routes/teams.routes")(app); // Teams Router
// require("./src/routes/vouchers.routes")(app); // Vouchers Router
// require("./src/routes/testimoni.routes")(app); // Testimoni Router
// require("./src/routes/services.routes")(app); // Services Router
require("./src/routes/auth.routes")(app); // Auth Router
// require("./src/routes/watchlist.routes")(app); // Watchlist Router
// require("./src/routes/coinmarketcap.routes")(app); // Coinmarketcap Router
