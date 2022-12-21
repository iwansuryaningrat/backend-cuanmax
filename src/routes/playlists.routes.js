import { findAllforUsers } from "../controllers/playlists.controller.js";
import Express from "express";
const router = Express.Router();

const playlistsRouter = (app) => {
  router.get("/", findAllforUsers);

  app.use("/v1/playlists", router);
};

export default playlistsRouter;
