import {
  findAll,
  findOne,
  deactivate,
  deleteSubs,
} from "../../controllers/subscribers.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const subscribersAdminRouter = (app) => {
  router.get("/", login, findAll);
  router.get("/:id", login, admin, findOne);
  router.delete("/:id", login, admin, deleteSubs);
  router.put("/:id", login, admin, deactivate);

  app.use("/v1/admin/subscribers", router);
};

export default subscribersAdminRouter;
