import { create as liveclassTransaction } from "../controllers/liveclassTransaction.controller.js";
import { create as membershipTransaction } from "../controllers/membershipTransaction.controller.js";

import Express from "express";
const router = Express.Router();

const transactionRouter = (app) => {
  router.post("/:userId/liveclass", liveclassTransaction);
  router.post("/:userId/membership", membershipTransaction);

  app.use("/v1/transaction", router);
};

export default transactionRouter;
