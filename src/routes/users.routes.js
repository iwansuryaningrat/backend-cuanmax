module.exports = (app) => {
  const users = require("../controllers/users.controller");
  const router = require("express").Router();

  router.get("/", users.findAll);
  router.get("/:id", users.findOne);
  router.delete("/:id", users.delete);

  app.use("/api/v1/users", router);
};
