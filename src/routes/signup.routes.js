module.exports = (app) => {
  const signup = require("../controllers/signup.controller");
  const router = require("express").Router();

  router.post("/", signup.create);

  app.use("/api/v1/signup", router);
};
