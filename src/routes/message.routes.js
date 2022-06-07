module.exports = (app) => {
  const message = require("../controllers/message.controller");
  const auth = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth.auth, message.findAll);
  router.post("/", message.create);
  router.get("/:id", auth.auth, message.findOne);
  router.get("/:status", auth.auth, message.findByStatus);
  router.get("/:id/read", auth.auth, message.read);
  router.delete("/:id", auth.auth, message.delete);

  app.use("/api/v1/messages", router);
};
