module.exports = (app) => {
  const { findAll } = require("../controllers/news.controller");
  const { auth } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth, findAll);

  app.use("/api/v1/news", router);
};
