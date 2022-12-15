import {
  findAll,
  findOne,
  create,
  deleteClass,
  update,
  updateThumbnail,
} from "../../controllers/liveclass.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const liveClassAdminRouter = (app) => {
  router.get("/", login, admin, findAll);
  router.get("/:id", login, admin, findOne);
  router.post("/", login, admin, create);
  router.delete("/:id", login, admin, deleteClass);
  router.put("/:id", login, admin, update);
  router.put("/:id/thumbnail", login, admin, updateThumbnail);

  app.use("/v1/admin/liveclass", router);
};

export default liveClassAdminRouter;
