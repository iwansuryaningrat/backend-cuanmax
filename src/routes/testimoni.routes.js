module.exports = (app) => {
  const testimoni = require("../controllers/testimoni.controller");
  const router = require("express").Router();

  router.get("/", testimoni.findAll);
  router.get("/:id", testimoni.findOne);
  router.post("/", testimoni.create);
  router.delete("/:id", testimoni.delete);

  app.use("/api/v1/testimoni", router);
};
