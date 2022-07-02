module.exports = (app) => {
  const { findAll, findOne } = require("../controllers/liveclass.controller");
  const { login, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", findAll);
  router.get("/:id", findOne);

  app.use("/api/v1/liveclass", router);
};
