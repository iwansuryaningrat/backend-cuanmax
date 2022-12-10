import {
  findAll,
  findAllNameId,
  findOne,
  create,
  update,
  updateThumbnail,
  deletePlaylist,
  changeStatus,
} from "../../controllers/playlists.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const playlistsAdminRouter = (app) => {
  router.get("/", login, admin, findAll);
  router.get("/name-id", login, admin, findAllNameId);
  router.post("/", login, admin, create);
  router.get("/:id", login, admin, findOne);
  router.put("/:id", login, admin, update);
  router.put("/:id/thumbnail", login, admin, updateThumbnail);
  router.delete("/:id", login, admin, deletePlaylist);
  router.put("/:id/status", login, admin, changeStatus);

  app.use("/v1/admin/playlists", router);
};

export default playlistsAdminRouter;
