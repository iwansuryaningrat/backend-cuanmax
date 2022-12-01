import { update } from "../controllers/referral.controller.js";
import { login, proMember } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const referralRouter = (app) => {
  router.put("/:referralCode", login, proMember, update);

  app.use("/v1/pro/referrals", router);
};

export default referralRouter;
