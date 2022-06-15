module.exports = (app) => {
  const { findAll, create } = require("../controllers/vouchers.controller");
  const { auth } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth, findAll);
  router.post("/", auth, create);

  app.use("/api/v1/vouchers", router);
};
