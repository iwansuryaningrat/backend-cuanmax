import { findAll, findOne } from "../controllers/liveclass.controller.js";
import Express from "express";
const router = Express.Router();

const liveClassRouter = (app) => {
  router.get("/", findAll);
  router.get("/:id", findOne);

  app.use("/v1/liveclass", router);
};

export default liveClassRouter;
