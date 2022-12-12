import {
  findAllPro,
  findByPlaylistPro,
  watchVideo,
  likeVideo,
  dislikeVideo,
} from "../../controllers/videos.controller.js";
import { login, proMember } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const videosRouter = (app) => {
  router.get("/", login, proMember, findAllPro);
  router.get("/:playlistId/playlist", login, proMember, findByPlaylistPro);
  router.get("/:id/watch", login, proMember, watchVideo);
  router.put("/:id/like", login, proMember, likeVideo);
  router.put("/:id/dislike", login, proMember, dislikeVideo);

  app.use("/v1/pro/videos", router);
};

export default videosRouter;
