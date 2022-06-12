module.exports = (app) => {
  const coinmarketcap = require("../controllers/coinmarketcap/coinmarketcap.controller");
  const router = require("express").Router();

  router.get("/map", coinmarketcap.map);
  router.get("/latest", coinmarketcap.latest);
  router.post("/info", coinmarketcap.info);
  router.post("/price", coinmarketcap.price);
  router.post("/convert", coinmarketcap.convert);

  app.use("/api/v1/cryptocurrency", router);
};
