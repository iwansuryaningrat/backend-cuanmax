import { create } from "../controllers/subscribers.controller.js";
import Express from "express";
const router = Express.Router();

const subscribersRouter = (app) => {
  router.post("/", create);

  app.use("/v1/subscribers", router);
};

export default subscribersRouter;
