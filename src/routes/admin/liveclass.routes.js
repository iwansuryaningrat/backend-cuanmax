import {
  findAll,
  findOne,
  create,
  deleteClass,
  update,
  updateThumbnail,
  changeStatus,
} from "../../controllers/liveclass.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const liveClassAdminRouter = (app) => {
  router.get("/", login, admin, findAll);
  router.get("/:id", login, admin, findOne);
  router.post("/", login, admin, create);
  router.put("/:id", login, admin, update);
  router.put("/:id/thumbnail", login, admin, updateThumbnail);
  router.put("/:id/status", login, admin, changeStatus);
  router.delete("/:id", login, admin, deleteClass);

  app.use("/v1/admin/liveclass", router);
};

export default liveClassAdminRouter;
