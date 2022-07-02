module.exports = (app) => {
  const {
    findAll,
    deleteNews,
    createNews,
    findById,
    update,
  } = require("../controllers/news.controller");
  const { login, admin } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", findAll);
  router.post("/", login, admin, createNews);
  router.delete("/:id", login, admin, deleteNews);
  router.get("/:id", findById);
  router.put("/:id", login, admin, update);

  app.use("/api/v1/news", router);
};
