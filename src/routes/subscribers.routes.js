module.exports = (app) => {
  const {
    findAll,
    findOne,
    create,
    update,
    deleteSubs,
  } = require("../controllers/subscribers.controller");
  const { login, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", login, findAll);
  router.get("/:id", login, admin, findOne);
  router.post("/", login, create);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deleteSubs);

  app.use("/api/v1/subscribers", router);
};
