module.exports = (app) => {
  const signup = require("../controllers/signup.controller");
  const router = require("express").Router();

  router.get("/", signup.findAll);

  app.use("/api/v1/signup", router);
};
