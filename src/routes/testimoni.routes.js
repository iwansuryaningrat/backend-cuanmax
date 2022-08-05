import {
  findAll,
  findOne,
  create,
  deleteTest,
  update,
} from "../controllers/testimoni.controller.js";
import { login, admin, proMember } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const testimoniRouter = (app) => {
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.post("/", login, admin, create);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deleteTest);

  app.use("/api/v1/testimoni", router);
};

export default testimoniRouter;
