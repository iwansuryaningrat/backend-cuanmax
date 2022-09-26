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
import headers from "../services/headers.js";

const subscribersRouter = (app) => {
  app.use(headers);

  router.get("/", login, findAll);
  router.get("/:id", login, admin, findOne);
  router.post("/", login, create);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deleteSubs);

  app.use("/api/v1/subscribers", router);
};

export default subscribersRouter;
