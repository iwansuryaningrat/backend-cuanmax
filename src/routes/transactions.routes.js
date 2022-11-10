// import { transactionsTest } from "../controllers/transactions.controller.js";
// import { liveclassTransactions } from "../controllers/midtrans/midtrans.controller.js";
import { login, admin } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const transactionsRouter = (app) => {
  // router.post("/:liveclassCode", liveclassTransactions);
  // router.post("/", transactionsTest);

  app.use("/api/v1/transactions", router);
};

export default transactionsRouter;
