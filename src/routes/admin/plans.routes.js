import {
  findAll,
  findOne,
  deletePlan,
  create,
  update,
  deactivate,
  addFeature,
  deleteFeature,
  deactivateFeature,
} from "../../controllers/plans.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const plansAdminRouter = (app) => {
  router.get("/", login, admin, findAll);
  router.get("/:id", login, admin, findOne);
  router.delete("/:id", login, admin, deletePlan);
  router.post("/", login, admin, create);
  router.put("/:id", login, admin, update);
  router.put("/deactivate/:id", login, admin, deactivate);
  router.post("/add-feature/:id", login, admin, addFeature);
  router.delete("/delete-feature/:id", login, admin, deleteFeature);
  router.put("/deactivate-feature/:id", login, admin, deactivateFeature);

  app.use("/v1/admin/plans", router);
};

export default plansAdminRouter;
