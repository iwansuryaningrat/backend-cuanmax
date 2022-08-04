module.exports = (app) => {
  const {
    findAll,
    findOne,
    deletePrice,
  } = require("../controllers/pricing.controller");
  const router = require("express").Router();

  router.get("/", findAll);
  router.get("/:id", findOne);
  router.delete("/:id", deletePrice);

  app.use("/api/v1/pricing", router);
};
