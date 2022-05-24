module.exports = (app) => {
  const vouchers = require("../controllers/vouchers.controller");
  const router = require("express").Router();

  router.get("/", vouchers.findAll);
  router.get("/:id", vouchers.findOne);
  router.delete("/:id", vouchers.delete);

  app.use("/api/v1/vouchers", router);
};
