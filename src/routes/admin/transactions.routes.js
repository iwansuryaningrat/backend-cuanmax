import {
  create,
  findAll,
} from "../../controllers/liveclassTransaction.controller.js";
import { login, admin } from "../../middlewares/auth.js";

import Express from "express";
const router = Express.Router();

const transactionAdminRouter = (app) => {
  router.post("/:userId", create);

  app.use("/v1/admin/transaction", router);
};

export default transactionAdminRouter;
