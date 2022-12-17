import {
  map,
  latest,
  info,
  price,
  convertCoin,
  topGainers,
} from "../controllers/coinmarketcap/coinmarketcap.controller.js";
import Express from "express";
const router = Express.Router();

const coinmarketcapRouter = (app) => {
  router.get("/map", map);
  router.get("/latest", latest);
  router.get("/top-gainers", topGainers);
  router.get("/info", info);
  router.get("/price", price);
  router.get("/convert", convertCoin);

  app.use("/v1/cryptocurrency", router);
};

export default coinmarketcapRouter;
