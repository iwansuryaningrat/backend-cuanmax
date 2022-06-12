module.exports = (app) => {
  const subscribers = require("../controllers/subscribers.controller");
  const auth = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth.auth, subscribers.findAll);
  router.get("/:id", auth.auth, subscribers.findOne);
  router.post("/", auth.auth, subscribers.create);
  router.put("/:id", auth.auth, subscribers.update);
  router.delete("/:id", auth.auth, subscribers.delete);

  app.use("/api/v1/subscribers", router);
};
