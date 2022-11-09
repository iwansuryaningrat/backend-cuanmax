import {
  findAll,
  findOne,
  create,
  update,
  deletePlaylist,
} from "../controllers/playlists.controller.js";
import { login, admin, proMember } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();
import headers from "../services/headers.js";

const playlistsRouter = (app) => {
  app.use(headers);

  router.get("/", login, findAll);
  router.post("/", login, admin, create);
  router.get("/:id", login, proMember, findOne);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deletePlaylist);

  app.use("/api/v1/playlists", router);
};

export default playlistsRouter;
