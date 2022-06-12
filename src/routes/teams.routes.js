module.exports = (app) => {
  const teams = require("../controllers/teams.controller");
  const auth = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth.auth, teams.findAll);
  router.post("/", auth.auth, teams.create);
  router.get("/:id", auth.auth, teams.findOne);
  router.put("/:id", auth.auth, teams.update);
  router.put("/:id/teamprofile", auth.auth, teams.teamProfile);
  router.delete("/:id", auth.auth, teams.delete);

  app.use("/api/v1/teams", router);
};
