import {
  findAll,
  findOne,
  findByPlaylist,
} from "../../controllers/videos.controller.js";
import { login, proMember } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const videosRouter = (app) => {
  router.get("/", login, proMember, findAll);
  router.get("/:id", login, proMember, findOne);
  router.get("/:playlistId", login, proMember, findByPlaylist);

  app.use("/v1/pro/videos", router);
};

export default videosRouter;
