module.exports = (app) => {
  const teams = require("../controllers/teams.controller");
  const { auth, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth, teams.findAll);
  router.post("/", auth, teams.create);
  router.get("/:id", auth, teams.findOne);
  router.put("/:id", auth, teams.update);
  router.put("/:id/teamprofile", auth, teams.teamProfile);
  router.delete("/:id", auth, teams.delete);

  app.use("/api/v1/teams", router);
};
