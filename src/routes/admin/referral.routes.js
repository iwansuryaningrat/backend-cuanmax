import {
  findAll,
  findOne,
  showAllVerification,
  showAllWithdraw,
  verifyBank,
  updateWDStatus,
} from "../../controllers/referral.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const referralAdminRouter = (app) => {
  router.get("/", login, admin, findAll);
  router.get("/:id", login, admin, findOne);
  router.get("/request/verification", login, admin, showAllVerification);
  router.get("/request/withdraw", login, admin, showAllWithdraw);
  router.put("/bankverify/:id", login, admin, verifyBank);
  router.put("/:id/:wdID", login, admin, updateWDStatus);

  app.use("/v1/admin/referrals", router);
};

export default referralAdminRouter;
