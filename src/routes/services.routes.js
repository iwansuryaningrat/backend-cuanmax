module.exports = (app) => {
  const {
    findAll,
    findOne,
    create,
    update,
    deleteService,
  } = require("../controllers/services.controller");
  const router = require("express").Router();

  router.get("/", findAll);
  router.post("/", create);
  router.get("/:id", findOne);
  router.put("/:id", update);
  router.delete("/:id", deleteService);

  app.use("/api/v1/services", router);
};
