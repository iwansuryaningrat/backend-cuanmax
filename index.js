// Express REST server
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// const bodyParser = require("body-parser");

// Load .env file
import "dotenv/config";

// Load File Configuration
import {
  imageStorage,
  imageFileFilter,
} from "./src/configs/imageUploader.config.js";
import { videosStorage, videosFilter } from "./src/configs/videosUploader.js";

const app = express();

// File Access Control
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Configuration for All Image Files
app.use(
  multer({
    storage: imageStorage,
    fileFilter: imageFileFilter,
  }).single("image")
);

// Configuration for All Video Files
app.use(
  multer({
    storage: videosStorage,
    fileFilter: videosFilter,
  }).single("video")
);

// MongoDB Connection
import connect from "./src/services/db.connect.js";
connect();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Cuanmax REST API",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port http://localhost:${process.env.PORT}`);
});

// Routers
import authRouter from "./src/routes/auth.routes.js"; // Auth Router
authRouter(app);
import coinmarketcapRouter from "./src/routes/coinmarketcap.routes.js"; // Coinmarketcap Router
coinmarketcapRouter(app); // Coinmarketcap Router
import liveclassRouter from "./src/routes/liveclass.routes.js"; // Liveclass Router
liveclassRouter(app); // Liveclass Router
import messagesRouter from "./src/routes/messages.routes.js"; // Messages Router
messagesRouter(app); // Messages Router
import newsRouter from "./src/routes/news.routes.js"; // News Router
newsRouter(app); // News Router
import playlistsRouter from "./src/routes/playlists.routes.js"; // Playlists Router
playlistsRouter(app); // Playlists Router
import pricingRouter from "./src/routes/pricing.routes.js"; // Pricing Router
pricingRouter(app); // Pricing Router
import servicesRouter from "./src/routes/services.routes.js"; // Services Router
servicesRouter(app); // Services Router
import subscribersRouter from "./src/routes/subscribers.routes.js"; // Subscribers Router
subscribersRouter(app); // Subscribers Router
import teamsRouter from "./src/routes/teams.routes.js"; // Teams Router
teamsRouter(app); // Teams Router
import testimoniRouter from "./src/routes/testimoni.routes.js"; // Testimoni Router
testimoniRouter(app); // Testimoni Router
import transactionsRouter from "./src/routes/transactions.routes.js";
transactionsRouter(app); // Transactions Router
import usersRouter from "./src/routes/users.routes.js"; // Users Router
usersRouter(app); // Users Router
import videosRouter from "./src/routes/videos.routes.js"; // Videos Router
videosRouter(app); // Videos Router
import vouchersRouter from "./src/routes/vouchers.routes.js"; // Vouchers Router
vouchersRouter(app); // Vouchers Router
import watchlistRouter from "./src/routes/watchlist.routes.js"; // Watchlist Router
watchlistRouter(app); // Watchlist Router

export default app;
