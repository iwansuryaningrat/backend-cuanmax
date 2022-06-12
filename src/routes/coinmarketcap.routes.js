module.exports = (app) => {
  const coinmarketcap = require("../controllers/coinmarketcap/coinmarketcap.controller");
  const router = require("express").Router();

  router.get("/map", coinmarketcap.map);
  router.get("/latest", coinmarketcap.latest);
  router.get("/info", coinmarketcap.info);
  router.get("/price", coinmarketcap.price);
  router.get("/convert", coinmarketcap.convert);

  app.use("/api/v1/cryptocurrency", router);
};
