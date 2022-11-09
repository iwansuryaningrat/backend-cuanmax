import {
  findAll,
  findOne,
  deletePrice,
  create,
  update,
} from "../controllers/pricing.controller.js";
import { login, admin } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();
import headers from "../services/headers.js";

const pricingRouter = (app) => {
  app.use(headers);

  router.get("/", findAll);
  router.get("/:id", findOne);
  router.delete("/:id", login, admin, deletePrice);
  router.post("/", login, admin, create);
  router.put("/:id", login, admin, update);

  app.use("/api/v1/pricing", router);
};

export default pricingRouter;
