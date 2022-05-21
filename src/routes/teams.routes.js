module.exports = (app) => {
  const teams = require("../controllers/teams.controller");
  const router = require("express").Router();

  router.get("/", teams.findAll);
  router.post("/", teams.create);
  router.get("/:id", teams.findOne);
  router.delete("/:id", teams.delete);

  app.use("/api/v1/teams", router);
};
