import {
  create,
  findAll,
  findOne,
  update,
  teamProfilePicture,
  deleteTeam,
  deactivate,
} from "../../controllers/teams.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const teamsRouterAdmin = (app) => {
  router.get("/", login, admin, findAll);
  router.post("/", login, admin, create);
  router.get("/:id", login, admin, findOne);
  router.delete("/:id", login, admin, deleteTeam);
  router.put("/:id", login, admin, update);
  router.put("/:id/teamprofile", login, admin, teamProfilePicture);
  router.put("/:id/deactivate", login, admin, deactivate);

  app.use("/v1/admin/teams", router);
};

export default teamsRouterAdmin;
