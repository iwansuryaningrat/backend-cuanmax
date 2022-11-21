import {
  findAll,
  findOne,
  create,
  read,
  reply,
  deleteMsg,
} from "../../controllers/messages.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const messagesAdminRouter = (app) => {
  router.get("/", login, admin, findAll);
  router.post("/", login, admin, create);
  router.get("/:id", login, admin, findOne);
  router.get("/:id/read", login, admin, read);
  router.get("/:id/reply", login, admin, reply);
  router.delete("/:id", login, admin, deleteMsg);

  app.use("/v1/admin/messages", router);
};

export default messagesAdminRouter;
