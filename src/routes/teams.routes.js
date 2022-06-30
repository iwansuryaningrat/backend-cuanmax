module.exports = (app) => {
  const {
    findAll,
    findOne,
    create,
    update,
    teamProfile,
    deleteTeam,
  } = require("../controllers/teams.controller");
  const { admin } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", findAll);
  router.post("/", admin, create);
  router.get("/:id", admin, findOne);
  router.put("/:id", admin, update);
  router.put("/:id/teamprofile", admin, teamProfile);
  router.delete("/:id", admin, deleteTeam);

  app.use("/api/v1/teams", router);
};
