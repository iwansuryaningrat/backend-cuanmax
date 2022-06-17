module.exports = (app) => {
  const watchlist = require("../controllers/watchlist.controller");
  const { auth, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", proMember, watchlist.findAll);
  router.post("/", admin, watchlist.create);
  router.get("/:id", proMember, watchlist.findOne);
  router.delete("/:id", admin, watchlist.delete);
  router.put("/:id/nonactivate", admin, watchlist.nonActivate);
  router.put("/:id", admin, watchlist.update);

  app.use("/api/v1/watchlists", router);
};
