import {
  findAll,
  findOne,
  create,
  deleteTesti,
  update,
} from "../../controllers/testimoni.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const testimoniAdminRouter = (app) => {
  router.get("/", findAll);
  router.get("/:id", findOne);
  router.post("/", login, admin, create);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deleteTesti);

  app.use("/v1/admin/testimoni", router);
};

export default testimoniAdminRouter;
