import { findAllforUsers } from "../../controllers/playlists.controller.js";
import { login } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const playlistsRouter = (app) => {
  router.get("/", login, findAllforUsers);

  app.use("/v1/users/playlists", router);
};

export default playlistsRouter;
