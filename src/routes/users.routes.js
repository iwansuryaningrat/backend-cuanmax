module.exports = (app) => {
  const users = require("../controllers/users.controller");
  const auth = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", users.findAll);
  router.get("/:id", users.findOne);
  router.post("/:id", auth.auth, users.update);
  router.delete("/:id", auth.auth, users.delete);

  app.use("/api/v1/users", router);
};
