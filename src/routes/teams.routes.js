import { findAllforUsers } from "../controllers/teams.controller.js";
import Express from "express";
const router = Express.Router();

const teamsRouter = (app) => {
  router.get("/", findAllforUsers);

  app.use("/v1/teams", router);
};

export default teamsRouter;
