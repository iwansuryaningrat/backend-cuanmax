import { findAll, findOne } from "../../controllers/playlists.controller.js";
import { login } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const playlistsRouter = (app) => {
  router.get("/", login, findAll);
  router.get("/:id", login, findOne);

  app.use("/v1/users/playlists", router);
};

export default playlistsRouter;
