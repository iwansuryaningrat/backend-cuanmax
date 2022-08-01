module.exports = (app) => {
  const { login } = require("../controllers/login.controller");
  const { signup } = require("../controllers/signup.controller");
  const router = require("express").Router();

  router.post("/login", login);
  router.post("/signup", signup);

  app.use("/api/v1", router);
};
