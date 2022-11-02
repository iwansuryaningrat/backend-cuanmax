import {
  create,
  findAll,
  findOne,
  findByPlaylist,
  update,
  deleteVideo,
  uploadThumbnail,
  uploadVideo,
} from "../controllers/videos.controller.js";
import { login, admin, proMember } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();
import headers from "../services/headers.js";

const videosRouter = (app) => {
  app.use(headers);

  router.get("/", login, proMember, findAll);
  router.get("/:id", login, proMember, findOne);
  router.get("/:playlistId", login, proMember, findByPlaylist);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deleteVideo);
  router.post("/", login, admin, create);
  router.post("/:id/thumbnail", login, admin, uploadThumbnail);
  router.post("/:id/video", login, admin, uploadVideo);

  app.use("/api/v1/videos", router);
};

export default videosRouter;
