module.exports = (app) => {
  const {
    findAll,
    findOne,
    deleteClass,
  } = require("../controllers/liveclass.controller");
  const { login, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", findAll);
  router.get("/:id", findOne);
  router.delete("/:id", login, admin, deleteClass);

  app.use("/api/v1/liveclass", router);
};
