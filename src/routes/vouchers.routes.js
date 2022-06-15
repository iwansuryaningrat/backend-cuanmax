module.exports = (app) => {
  const vouchers = require("../controllers/vouchers.controller");
  const router = require("express").Router();

  router.get("/", vouchers.findAll);

  app.use("/api/v1/vouchers", router);
};
