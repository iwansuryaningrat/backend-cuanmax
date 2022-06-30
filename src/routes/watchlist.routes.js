module.exports = (app) => {
  const {
    findAll,
    findOne,
    create,
    deleteWl,
    nonActivate,
    update,
  } = require("../controllers/watchlist.controller");
  const { admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", proMember, findAll);
  router.post("/", admin, create);
  router.get("/:id", proMember, findOne);
  router.delete("/:id", admin, deleteWl);
  router.put("/:id/nonactivate", admin, nonActivate);
  router.put("/:id", admin, update);

  app.use("/api/v1/watchlists", router);
};
