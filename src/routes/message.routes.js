module.exports = (app) => {
  const message = require("../controllers/message.controller");
  const { auth } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth, message.findAll);
  router.post("/", message.create);
  router.get("/:id", auth, message.findOne);
  router.get("/:id/read", auth, message.read);
  router.get("/:id/reply", auth, message.reply);
  router.delete("/:id", auth, message.delete);

  app.use("/api/v1/messages", router);
};
