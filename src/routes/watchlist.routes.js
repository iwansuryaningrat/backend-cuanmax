module.exports = (app) => {
  const watchlist = require("../controllers/watchlist.controller");
  const auth = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth.auth, watchlist.findAll);
  router.post("/", auth.auth, watchlist.create);
  router.get("/:id", auth.auth, watchlist.findOne);
  router.delete("/:id", auth.auth, watchlist.delete);
  router.put("/:id/nonactivate", auth.auth, watchlist.nonActivate);

  app.use("/api/v1/watchlists", router);
};
