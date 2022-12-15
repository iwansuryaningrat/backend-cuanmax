import { findAll, findOne } from "../../controllers/watchlist.controller.js";
import { login, proMember } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const watchlistRouter = (app) => {
  router.get("/", login, proMember, findAll);
  router.get("/:id", login, proMember, findOne);

  app.use("/v1/pro/watchlists", router);
};

export default watchlistRouter;
