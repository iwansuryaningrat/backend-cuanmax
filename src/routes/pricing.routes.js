module.exports = (app) => {
  const pricing = require("../controllers/pricing.controller");
  const router = require("express").Router();

  router.get("/", pricing.findAll);
  router.get("/:id", pricing.findOne);
  router.delete("/:id", pricing.delete);

  app.use("/api/v1/pricing", router);
};
