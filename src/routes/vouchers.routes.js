module.exports = (app) => {
  const vouchers = require("../controllers/vouchers.controller");
  const { auth } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth, vouchers.findAll);

  app.use("/api/v1/vouchers", router);
};
