module.exports = (app) => {
  const watchlist = require("../controllers/watchlist.controller");
  const auth = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth.auth, watchlist.findAll);
  router.get("/:id", auth.auth, watchlist.findOne);
  router.delete("/:id", auth.auth, watchlist.delete);
  router.get("/id/nonactivate", auth.auth, watchlist.nonActivate);

  app.use("/api/v1/watchlist", router);
};
