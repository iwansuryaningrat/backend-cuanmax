module.exports = (app) => {
  const { findAll } = require("../controllers/liveclass.controller");
  const { login, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", findAll);

  app.use("/api/v1/liveclass", router);
};
