import {
  findAll,
  findOne,
  create,
  read,
  reply,
  deleteMsg,
} from "../controllers/messages.controller.js";
import { admin } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const messagesRouter = (app) => {
  router.get("/", admin, findAll);
  router.post("/", create);
  router.get("/:id", admin, findOne);
  router.get("/:id/read", admin, read);
  router.get("/:id/reply", admin, reply);
  router.delete("/:id", admin, deleteMsg);

  app.use("/api/v1/messages", router);
};

export default messagesRouter;
