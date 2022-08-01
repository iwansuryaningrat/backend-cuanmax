module.exports = (app) => {
  const {
    map,
    latest,
    info,
    price,
    convert,
  } = require("../controllers/coinmarketcap/coinmarketcap.controller");
  const router = require("express").Router();

  router.get("/map", map);
  router.get("/latest", latest);
  router.get("/info", info);
  router.get("/price", price);
  router.get("/convert", convert);

  app.use("/api/v1/cryptocurrency", router);
};
