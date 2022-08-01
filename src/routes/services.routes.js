module.exports = (app) => {
  const {
    findAll,
    findOne,
    create,
    update,
  } = require("../controllers/services.controller");
  const router = require("express").Router();

  router.get("/", findAll);
  router.post("/", create);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", services.delete);

  app.use("/api/v1/services", router);
};
