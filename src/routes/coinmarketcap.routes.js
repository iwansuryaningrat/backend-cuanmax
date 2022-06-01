module.exports = (app) => {
  const coinmarketcap = require("../controllers/coinmarketcap.controller");
  const router = require("express").Router();

  router.get("/latest", coinmarketcap.latest);

  app.use("/api/v1/crypto", router);
};
