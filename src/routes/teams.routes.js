import { findAll, findOne } from "../controllers/teams.controller.js";
import Express from "express";
const router = Express.Router();

const teamsRouter = (app) => {
  router.get("/", findAll);
  router.get("/:id", findOne);

  app.use("/v1/teams", router);
};

export default teamsRouter;
