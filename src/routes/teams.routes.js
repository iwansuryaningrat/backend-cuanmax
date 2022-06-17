module.exports = (app) => {
  const teams = require("../controllers/teams.controller");
  const { admin } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", teams.findAll);
  router.post("/", admin, teams.create);
  router.get("/:id", admin, teams.findOne);
  router.put("/:id", admin, teams.update);
  router.put("/:id/teamprofile", admin, teams.teamProfile);
  router.delete("/:id", admin, teams.delete);

  app.use("/api/v1/teams", router);
};
