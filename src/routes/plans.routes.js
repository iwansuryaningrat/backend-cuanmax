import { findAllforUsers, findOne } from "../controllers/plans.controller.js";
import Express from "express";
const router = Express.Router();

const plansRouter = (app) => {
  router.get("/", findAllforUsers);
  router.get("/:id", findOne);

  app.use("/v1/plans", router);
};

export default plansRouter;
