import { useVoucher } from "../controllers/vouchers.controller.js";
import Express from "express";
const router = Express.Router();

const vouchersRouter = (app) => {
  router.get("/:voucherCode", useVoucher);

  app.use("/v1/vouchers", router);
};

export default vouchersRouter;
