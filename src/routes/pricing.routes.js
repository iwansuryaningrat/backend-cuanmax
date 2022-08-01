module.exports = (app) => {
  const { findAll, findOne } = require("../controllers/pricing.controller");
  const router = require("express").Router();

  router.get("/", findAll);
  router.get("/:id", findOne);
  router.delete("/:id", pricing.delete);

  app.use("/api/v1/pricing", router);
};
