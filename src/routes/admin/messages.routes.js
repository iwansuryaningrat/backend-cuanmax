import {
  findAll,
  findOne,
  read,
  reply,
  deleteMsg,
} from "../../controllers/messages.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const messagesAdminRouter = (app) => {
  router.get("/", login, admin, findAll);
  router.get("/:id", login, admin, findOne);
  router.put("/:id/read", login, admin, read);
  router.post("/:id/reply", login, admin, reply);
  router.delete("/:id", login, admin, deleteMsg);

  app.use("/v1/admin/messages", router);
};

export default messagesAdminRouter;
