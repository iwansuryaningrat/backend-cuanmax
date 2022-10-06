import {
  map,
  latest,
  info,
  price,
  convertCoin,
} from "../controllers/coinmarketcap/coinmarketcap.controller.js";
import Express from "express";
const router = Express.Router();
import headers from "../services/headers.js";

const coinmarketcapRouter = (app) => {
  app.use(headers);

  router.get("/map", map);
  router.get("/latest", latest);
  router.get("/info", info);
  router.get("/price", price);
  router.get("/convert", convertCoin);

  app.use("/api/v1/cryptocurrency", router);
};

export default coinmarketcapRouter;
