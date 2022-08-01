module.exports = (app) => {
  const {
    findAll,
    findOne,
    create,
    read,
    reply,
    deleteMsg,
  } = require("../controllers/messages.controller");
  const { admin } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", admin, findAll);
  router.post("/", create);
  router.get("/:id", admin, findOne);
  router.get("/:id/read", admin, read);
  router.get("/:id/reply", admin, reply);
  router.delete("/:id", admin, deleteMsg);

  app.use("/api/v1/messages", router);
};
