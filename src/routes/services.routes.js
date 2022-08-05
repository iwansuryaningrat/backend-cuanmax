import {
  findAll,
  findOne,
  create,
  update,
  deleteService,
} from "../controllers/services.controller.js";
import { login, admin, proMember } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const servicesRouter = (app) => {
  router.get("/", findAll);
  router.post("/", login, admin, create);
  router.get("/:id", findOne);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deleteService);

  app.use("/api/v1/services", router);
};

export default servicesRouter;
