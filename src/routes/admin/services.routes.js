import {
  findAll,
  findOne,
  create,
  uploadImage,
  update,
  deleteService,
} from "../../controllers/services.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const servicesAdminRouter = (app) => {
  router.get("/", findAll);
  router.post("/", login, admin, create);
  router.post("/upload-image", login, admin, uploadImage);
  router.get("/:id", findOne);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deleteService);

  app.use("/v1/admin/services", router);
};

export default servicesAdminRouter;
