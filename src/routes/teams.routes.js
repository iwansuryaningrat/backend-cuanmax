module.exports = (app) => {
  const {
    findAll,
    findOne,
    create,
    update,
    teamProfile,
    deleteTeam,
  } = require("../controllers/teams.controller");
  const { login, admin } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", findAll);
  router.post("/", admin, create);
  router.get("/:id", login, admin, findOne);
  router.put("/:id", login, admin, update);
  router.put("/:id/teamprofile", login, admin, teamProfile);
  router.delete("/:id", login, admin, deleteTeam);

  app.use("/api/v1/teams", router);
};
