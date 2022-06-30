module.exports = (app) => {
  const {
    findAll,
    findOne,
    create,
    update,
    deleteSubs,
  } = require("../controllers/subscribers.controller");
  const { auth, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth, findAll);
  router.get("/:id", admin, findOne);
  router.post("/", create);
  router.put("/:id", admin, update);
  router.delete("/:id", admin, deleteSubs);

  app.use("/api/v1/subscribers", router);
};
