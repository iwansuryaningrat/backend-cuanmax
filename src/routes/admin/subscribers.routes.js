import {
  findAll,
  findOne,
  create,
  update,
  deleteSubs,
} from "../controllers/subscribers.controller.js";
import { login, admin } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const subscribersRouter = (app) => {
  router.get("/", login, findAll);
  router.get("/:id", login, admin, findOne);
  router.post("/", login, create);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deleteSubs);

  app.use("/v1/admin/subscribers", router);
};

export default subscribersRouter;
