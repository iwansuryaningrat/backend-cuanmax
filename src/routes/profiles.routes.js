module.exports = (app) => {
  const profiles = require("../controllers/profiles.controller");
  const router = require("express").Router();

  router.get("/", profiles.findAll);
  router.get("/:id", profiles.findOne);
  router.post("/:id", profiles.update);
  router.delete("/:id", profiles.delete);

  app.use("/api/v1/profiles", router);
};
