import {
  findAll,
  findOne,
  create,
  update,
  teamProfile,
  deleteTeam,
} from "../controllers/teams.controller.js";
import { login, admin } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const teamsRouter = (app) => {
  router.get("/", findAll);
  router.post("/", login, admin, create);
  router.get("/:id", login, admin, findOne);
  router.put("/:id", login, admin, update);
  router.put("/:id/teamprofile", login, admin, teamProfile);
  router.delete("/:id", login, admin, deleteTeam);

  app.use("/api/v1/teams", router);
};

export default teamsRouter;
