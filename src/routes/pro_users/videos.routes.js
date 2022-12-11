import {
  findAllPro,
  findOne,
  findByPlaylistPro,
} from "../../controllers/videos.controller.js";
import { login, proMember } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const videosRouter = (app) => {
  router.get("/", login, proMember, findAllPro);
  router.get("/:id", login, proMember, findOne);
  router.get("/:playlistId", login, proMember, findByPlaylistPro);

  app.use("/v1/pro/videos", router);
};

export default videosRouter;
