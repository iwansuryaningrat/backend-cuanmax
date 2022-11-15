import findAll from "../controllers/teams.controller.js";
import Express from "express";
const router = Express.Router();

const teamsRouter = (app) => {
  router.get("/", findAll);

  app.use("/v1/teams", router);
};

export default teamsRouter;
