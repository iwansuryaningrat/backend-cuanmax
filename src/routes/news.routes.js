module.exports = (app) => {
  const news = require("../controllers/news.controller");
  const { auth } = require("../middlewares/auth");
  const router = require("express").Router();

  // app.use("/api/v1/news", router);
};
