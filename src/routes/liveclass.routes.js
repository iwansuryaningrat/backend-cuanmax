import {
  findAll,
  findOne,
  create,
  deleteClass,
  update,
} from "../controllers/liveclass.controller.js";
import { login, admin, proMember } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const liveClassRouter = (app) => {
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.post("/", login, admin, create);
  router.delete("/:id", login, admin, deleteClass);
  router.put("/:id", login, admin, update);

  app.use("/api/v1/liveclass", router);
};

export default liveClassRouter;
