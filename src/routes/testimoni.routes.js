module.exports = (app) => {
  const {
    findAll,
    findOne,
    create,
    deleteTest,
    update,
  } = require("../controllers/testimoni.controller");
  const { login, admin } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", findAll);
  router.get("/:id", findOne);
  router.post("/", login, admin, create);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deleteTest);

  app.use("/api/v1/testimoni", router);
};
