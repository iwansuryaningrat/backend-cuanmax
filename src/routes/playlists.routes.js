module.exports = (app) => {
  const playlists = require("../controllers/playlists.controller");
  const router = require("express").Router();

  router.get("/", playlists.findAll);
  router.post("/", playlists.create);
  router.get("/:id", playlists.findOne);
  router.put("/:id", playlists.update);
  router.delete("/:id", playlists.delete);

  app.use("/api/v1/playlists", router);
};
