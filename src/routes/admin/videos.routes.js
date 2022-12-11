import {
  create,
  findAll,
  findOne,
  findByPlaylist,
  update,
  deleteVideo,
  updateThumbnail,
  updateStatus,
} from "../../controllers/videos.controller.js";
import { login, admin, proMember } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const videosAdminRouter = (app) => {
  router.get("/", login, proMember, findAll);
  router.get("/:id", login, proMember, findOne);
  router.get("/:playlistId", login, proMember, findByPlaylist);
  router.post("/", login, admin, create);
  router.put("/:id", login, admin, update);
  router.put("/:id/thumbnail", login, admin, updateThumbnail);
  router.put("/:id/status", login, admin, updateStatus);
  router.delete("/:id", login, admin, deleteVideo);

  app.use("/v1/admin/videos", router);
};

export default videosAdminRouter;
