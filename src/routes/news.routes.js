module.exports = (app) => {
  const {
    findAll,
    deleteNews,
    createNews,
  } = require("../controllers/news.controller");
  const { login, admin } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", findAll);
  router.post("/", login, admin, createNews);
  router.delete("/:id", login, admin, deleteNews);

  app.use("/api/v1/news", router);
};
