module.exports = (app) => {
  const profiles = require("../controllers/profiles.controller");
  const router = require("express").Router();

  router.get("/", profiles.findAll);

  app.use("/api/v1/profiles", router);
};
