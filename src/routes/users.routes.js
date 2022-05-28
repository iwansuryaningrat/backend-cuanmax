module.exports = (app) => {
  const users = require("../controllers/users.controller");
  const auth = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth.auth, users.findAll);
  router.get("/:id", users.findOne);
  router.delete("/:id", users.delete);

  app.use("/api/v1/users", router);
};
