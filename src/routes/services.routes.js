import { findAll, findOne } from "../controllers/services.controller.js";
import Express from "express";
const router = Express.Router();

const servicesRouter = (app) => {
  router.get("/", findAll);
  router.get("/:id", findOne);

  app.use("/v1/services", router);
};

export default servicesRouter;
