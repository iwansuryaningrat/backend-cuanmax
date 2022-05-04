module.exports = (app) => {
  const playlists = require("../controllers/playlists.controller");
  const router = require("express").Router();

  router.get("/", playlists.findAll);

  app.use("/api/v1/playlists", router);
};
