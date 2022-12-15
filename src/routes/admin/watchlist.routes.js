import {
  findAll,
  findOne,
  create,
  deleteWl,
  nonActivate,
  update,
} from "../../controllers/watchlist.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const watchlistAdminRouter = (app) => {
  router.get("/", login, admin, findAll);
  router.post("/", login, admin, create);
  router.get("/:id", login, admin, findOne);
  router.delete("/:id", login, admin, deleteWl);
  router.put("/:id/nonactivate", login, admin, nonActivate);
  router.put("/:id", login, admin, update);

  app.use("/v1/admin/watchlists", router);
};

export default watchlistAdminRouter;
