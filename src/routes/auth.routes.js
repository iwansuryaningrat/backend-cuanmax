module.exports = (app) => {
  const login = require("../controllers/login.controller");
  const signup = require("../controllers/signup.controller");
  const router = require("express").Router();

  router.post("/login", login.login);
  router.post("/signup", signup.signup);

  app.use("/api/v1/message", router);
};
