import {
  findAll,
  create,
  deleteVoucher,
  update,
  findOne,
} from "../controllers/vouchers.controller.js";
import { login, admin } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();
import headers from "../services/headers.js";

const vouchersRouter = (app) => {
  app.use(headers);

  router.get("/", login, admin, findAll);
  router.post("/", login, admin, create);
  router.get("/:id", login, findOne);
  router.delete("/:id", login, admin, deleteVoucher);
  router.put("/:id", login, admin, update);

  app.use("/api/v1/vouchers", router);
};

export default vouchersRouter;
