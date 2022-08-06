import {
  findAll,
  findOne,
  create,
  deleteWl,
  nonActivate,
  update,
} from "../controllers/watchlist.controller.js";
import { login, admin, proMember } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const watchlistRouter = (app) => {
  router.get("/", login, proMember, findAll);
  router.post("/", login, admin, create);
  router.get("/:id", login, proMember, findOne);
  router.delete("/:id", login, admin, deleteWl);
  router.put("/:id/nonactivate", login, admin, nonActivate);
  router.put("/:id", login, admin, update);

  app.use("/api/v1/watchlists", router);
};

export default watchlistRouter;
