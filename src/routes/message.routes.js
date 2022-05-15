module.exports = (app) => {
  const message = require("../controllers/message.controller");
  const router = require("express").Router();

  router.get("/", message.findAll);
  router.post("/", message.create);
  router.get("/:id", message.findOne);
  router.put("/:id", message.update);
  router.delete("/:id", message.delete);

  app.use("/api/v1/message", router);
};
