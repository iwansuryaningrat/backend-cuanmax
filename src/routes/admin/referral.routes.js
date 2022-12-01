import {
  findAll,
  findOne,
  verify,
} from "../../controllers/referral.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const referralAdminRouter = (app) => {
  router.get("/", login, admin, findAll);
  router.get("/:id", login, admin, findOne);
  router.put("/:id", login, admin, verify);

  app.use("/v1/admin/referrals", router);
};

export default referralAdminRouter;
