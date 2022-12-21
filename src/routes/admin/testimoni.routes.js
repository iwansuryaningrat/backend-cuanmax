import {
  findAllAdmin,
  findOne,
  create,
  deleteTesti,
  update,
  deactivate,
  uploadPhotos,
} from "../../controllers/testimoni.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const testimoniAdminRouter = (app) => {
  router.get("/", login, admin, findAllAdmin);
  router.get("/:id", login, admin, findOne);
  router.post("/", login, admin, create);
  router.delete("/:id", login, admin, deleteTesti);
  router.put("/:id", login, admin, update);
  router.put("/deactivate/:id", login, admin, deactivate);
  router.put("/upload/:id", login, admin, uploadPhotos);

  app.use("/v1/admin/testimoni", router);
};

export default testimoniAdminRouter;
