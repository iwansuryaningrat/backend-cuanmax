import {
  findAll,
  create,
  uploadImage,
  findOne,
  deleteService,
  update,
  addBenefit,
  deactivate,
} from "../../controllers/services.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const servicesAdminRouter = (app) => {
  router.get("/", login, admin, findAll);
  router.get("/:id", login, admin, findOne);
  router.post("/", login, admin, create);
  router.put("/:id/upload-image", login, admin, uploadImage);
  router.put("/:id", login, admin, update);
  router.put("/:id/add-benefit", login, admin, addBenefit);
  router.put("/:id/deactivate", login, admin, deactivate);
  router.delete("/:id", login, admin, deleteService);

  app.use("/v1/admin/services", router);
};

export default servicesAdminRouter;
