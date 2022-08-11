import { login, admin } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const transactionsRouter = (app) => {
  app.use("/api/v1/transactions", router);
};

export default transactionsRouter;
