import { create } from "../controllers/messages.controller.js";
import Express from "express";
const router = Express.Router();

const messagesRouter = (app) => {
  router.post("/", create);

  app.use("/v1/messages", router);
};

export default messagesRouter;
