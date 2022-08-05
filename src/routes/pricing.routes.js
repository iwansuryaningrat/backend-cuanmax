import {
  findAll,
  findOne,
  deletePrice,
} from "../controllers/pricing.controller.js";
import { login, admin, proMember } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const pricingRouter = (app) => {
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.delete("/:id", login, admin, deletePrice);

  app.use("/api/v1/pricing", router);
};

export default pricingRouter;
