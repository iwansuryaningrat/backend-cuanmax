module.exports = (app) => {
  const watchlist = require("../controllers/watchlist.controller");
  const router = require("express").Router();

  router.get("/", watchlist.findAll);
  router.get("/:id", watchlist.findOne);
  router.delete("/:id", watchlist.delete);

  app.use("/api/v1/watchlist", router);
};
