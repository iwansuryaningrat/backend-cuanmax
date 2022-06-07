module.exports = (app) => {
  const coinmarketcap = require("../controllers/coinmarketcap/coinmarketcap.controller");
  const auth = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/map", auth.auth, coinmarketcap.map);
  router.get("/latest", auth.auth, coinmarketcap.latest);
  router.post("/info", auth.auth, coinmarketcap.info);
  router.post("/price", auth.auth, coinmarketcap.price);
  router.post("/convert", auth.auth, coinmarketcap.convert);

  app.use("/api/v1/cryptocurrency", router);
};
