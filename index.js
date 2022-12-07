// Express REST server
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Load .env file
import "dotenv/config";

// Load File Configuration
import {
  imageStorage,
  imageFileFilter,
} from "./src/configs/imageUploader.config.js";
// import { videosStorage, videosFilter } from "./src/configs/videosUploader.js";

const app = express();

// File Access Control
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-access-token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cookieSession({
    name: "Cuanmax",
    secret: "COOKIE_SECRET",
    httpOnly: true,
    sameSite: "strict",
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
// app.use(
//   multer({
//     storage: videosStorage,
//     fileFilter: videosFilter,
//   }).single("video")
// );

// MongoDB Connection
import connect from "./src/services/db.connect.service.js";
connect();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Cuanmax REST API",
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});

// General Routers
import authRouter from "./src/routes/auth.routes.js"; // Auth Router
authRouter(app); // Auth Router
// import coinmarketcapRouter from "./src/routes/coinmarketcap.routes.js"; // Coinmarketcap Router
// coinmarketcapRouter(app); // Coinmarketcap Router
import messagesRouter from "./src/routes/messages.routes.js"; // Messages Router
messagesRouter(app); // Messages Router
import plansRouter from "./src/routes/plans.routes.js"; // Plans Router
plansRouter(app); // Plans Router
import servicesRouter from "./src/routes/services.routes.js"; // Services Router
servicesRouter(app); // Services Router
import subscribersRouter from "./src/routes/subscribers.routes.js"; // Subscribers Router
subscribersRouter(app); // Subscribers Router
import teamsRouter from "./src/routes/teams.routes.js"; // Teams Router
teamsRouter(app); // Teams Router
import testimoniRouter from "./src/routes/testimoni.routes.js"; // Testimoni Router
testimoniRouter(app); // Testimoni Router
import apiDocsRouter from "./src/routes/api-docs.routes.js"; // API Docs Router
apiDocsRouter(app); // API Docs Router

// * Admin Routers
// Liveclass Router
import messagesAdminRouter from "./src/routes/admin/messages.routes.js"; // Messages Router
messagesAdminRouter(app); // Messages Router
// News Router
// Playlists Router
import plansAdminRouter from "./src/routes/admin/plans.routes.js"; // Plans Router
plansAdminRouter(app); // Plans Router
import playlistsAdminRouter from "./src/routes/admin/playlists.routes.js"; // Playlists Router
playlistsAdminRouter(app); // Playlists Router
import referralAdminRouter from "./src/routes/admin/referral.routes.js"; // Referral Router
referralAdminRouter(app); // Referral Router
import servicesAdminRouter from "./src/routes/admin/services.routes.js"; // Services Router
servicesAdminRouter(app); // Services Router
import subscribersAdminRouter from "./src/routes/admin/subscribers.routes.js"; // Subscribers Router
subscribersAdminRouter(app); // Subscribers Router
import teamsRouterAdmin from "./src/routes/admin/teams.routes.js"; // Teams Router
teamsRouterAdmin(app); // Teams Router
import testimoniAdminRouter from "./src/routes/admin/testimoni.routes.js"; // Testimoni Router
testimoniAdminRouter(app); // Testimoni Router
// Transactions Router
import usersAdminRouter from "./src/routes/admin/users.routes.js"; // Users Router
usersAdminRouter(app); // Users Router
// Videos Router
// Vouchers Router
// Watchlists Router

// * Pro Users Routers
import playlistsProRouter from "./src/routes/pro_users/playlists.routes.js"; // Playlists Router
playlistsProRouter(app); // Playlists Router
import referralRouter from "./src/routes/pro_users/referral.routes.js"; // Referral Router
referralRouter(app); // Referral Router
import usersProRouter from "./src/routes/pro_users/users.routes.js"; // Users Router
usersProRouter(app); // Users Router

// * Basic Users Routers
import playlistsRouter from "./src/routes/users/playlists.routes.js"; // Playlists Router
playlistsRouter(app); // Playlists Router
import usersRouter from "./src/routes/users/users.routes.js"; // Users Router
usersRouter(app); // Users Router

export default app;
