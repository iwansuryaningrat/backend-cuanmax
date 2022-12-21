import {
  findAllforPro,
  findOne,
} from "../../controllers/playlists.controller.js";
import { login, proMember } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const playlistsProRouter = (app) => {
  router.get("/", login, proMember, findAllforPro);
  router.get("/:id", login, proMember, findOne);

  app.use("/v1/pro/playlists", router);
};

export default playlistsProRouter;
