module.exports = (app) => {
  const videos = require("../controllers/videos.controller");
  const router = require("express").Router();

  router.get("/", videos.findAll);
  router.get("/:id", videos.findOne);
  router.delete("/:id", videos.delete);

  app.use("/api/v1/videos", router);
};
