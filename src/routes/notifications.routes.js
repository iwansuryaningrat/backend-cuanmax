import notificationController from "../controllers/notification.controller.js";
import Express from "express";
const router = Express.Router();

const notificationsRouter = (app) => {
  app.post("/", notificationController);
  app.use("/v1/notifications", router);
};

export default notificationsRouter;
