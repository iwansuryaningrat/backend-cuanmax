import { findAll } from "../controllers/testimoni.controller.js";
import Express from "express";
const router = Express.Router();

const testimoniRouter = (app) => {
  router.get("/", findAll);

  app.use("/v1/testimoni", router);
};

export default testimoniRouter;
