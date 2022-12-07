import {
  findAll,
  findOne,
  create,
  update,
  deletePlaylist,
} from "../../controllers/playlists.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const playlistsAdminRouter = (app) => {
  router.get("/", login, admin, findAll);
  router.post("/", login, admin, create);
  router.get("/:id", login, admin, findOne);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deletePlaylist);

  app.use("/api/v1/playlists", router);
};

export default playlistsAdminRouter;
