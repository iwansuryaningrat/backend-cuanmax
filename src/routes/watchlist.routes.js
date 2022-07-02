module.exports = (app) => {
  const {
    findAll,
    findOne,
    create,
    deleteWl,
    nonActivate,
    update,
  } = require("../controllers/watchlist.controller");
  const { login, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", login, proMember, findAll);
  router.post("/", login, admin, create);
  router.get("/:id", login, proMember, findOne);
  router.delete("/:id", login, admin, deleteWl);
  router.put("/:id/nonactivate", login, admin, nonActivate);
  router.put("/:id", login, admin, update);

  app.use("/api/v1/watchlists", router);
};
