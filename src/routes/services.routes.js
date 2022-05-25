module.exports = (app) => {
  const services = require("../controllers/services.controller");
  const router = require("express").Router();

  router.get("/", services.findAll);
  router.post("/", services.create);
  router.get("/:id", services.findOne);

  app.use("/api/v1/services", router);
};
