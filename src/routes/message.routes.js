module.exports = (app) => {
  const message = require("../controllers/message.controller");
  const { admin } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", admin, message.findAll);
  router.post("/", message.create);
  router.get("/:id", admin, message.findOne);
  router.get("/:id/read", admin, message.read);
  router.get("/:id/reply", admin, message.reply);
  router.delete("/:id", admin, message.delete);

  app.use("/api/v1/messages", router);
};
