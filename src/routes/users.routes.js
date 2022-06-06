module.exports = (app) => {
  const users = require("../controllers/users.controller");
  const auth = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth.auth, users.findAll);
  router.get("/:id", auth.auth, users.findOne);
  router.post("/:id", auth.auth, users.update);
  router.post("/changePassword/:id", auth.auth, users.changePassword);
  router.delete("/:id", auth.auth, users.delete);

  app.use("/api/v1/users", router);
};
