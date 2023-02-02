import {
  addBankAccount,
  changeReferralCode,
  requestWD,
} from "../../controllers/referral.controller.js";
import { login, proMember } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const referralRouter = (app) => {
  router.post("/addbank/:referralCode", login, proMember, addBankAccount);
  router.put("/:referralCode", login, proMember, changeReferralCode);
  router.post("/wd/:referralCode", login, proMember, requestWD);

  app.use("/v1/pro/referrals", router);
};

export default referralRouter;
