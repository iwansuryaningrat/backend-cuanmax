module.exports = (app) => {
  const subscribers = require("../controllers/subscribers.controller");
  const router = require("express").Router();

  router.get("/", subscribers.findAll);
  router.get("/:id", subscribers.findOne);
  router.post("/", subscribers.create);
  router.delete("/:id", subscribers.delete);

  app.use("/api/v1/subscribers", router);
};
