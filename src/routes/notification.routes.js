import notificationController from "../controllers/notification.controller.js";
import Express from "express";
const router = Express.Router();

const notificationRouter = (app) => {
  app.post("/", notificationController);
  app.use("/v1/notification", router);
};

export default notificationRouter;
