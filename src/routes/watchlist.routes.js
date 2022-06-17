module.exports = (app) => {
  const watchlist = require("../controllers/watchlist.controller");
  const { auth, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth, watchlist.findAll);
  router.post("/", auth, watchlist.create);
  router.get("/:id", auth, watchlist.findOne);
  router.delete("/:id", auth, watchlist.delete);
  router.put("/:id/nonactivate", auth, watchlist.nonActivate);
  router.put("/:id", auth, watchlist.update);

  app.use("/api/v1/watchlists", router);
};
