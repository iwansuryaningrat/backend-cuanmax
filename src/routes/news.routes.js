module.exports = (app) => {
  const { findAll, deleteNews } = require("../controllers/news.controller");
  const { login, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", findAll);
  router.delete("/:id", login, admin, deleteNews);

  app.use("/api/v1/news", router);
};
