import {
  findAll,
  findOne,
  create,
  deleteClass,
  update,
  uploadThumbnail,
} from "../controllers/liveclass.controller.js";
import { login, admin } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();
import headers from "../services/headers.js";

const liveClassRouter = (app) => {
  app.use(headers);

  router.get("/", findAll);
  router.get("/:id", findOne);
  router.post("/", login, admin, create);
  router.delete("/:id", login, admin, deleteClass);
  router.put("/:id", login, admin, update);
  router.post("/:id/thumbnail", login, admin, uploadThumbnail);

  app.use("/api/v1/liveclass", router);
};

export default liveClassRouter;
