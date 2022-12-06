import {
  findAll,
  findOne,
  deletePrice,
  create,
  update,
} from "../../controllers/plans.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const plansAdminRouter = (app) => {
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.delete("/:id", login, admin, deletePrice);
  router.post("/", login, admin, create);
  router.put("/:id", login, admin, update);

  app.use("/v1/admin/plans", router);
};

export default plansAdminRouter;
