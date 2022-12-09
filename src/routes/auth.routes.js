import loggingin from "../controllers/auth/login.controller.js";
import signup from "../controllers/auth/signup.controller.js";
import {
  forgotPassword,
  resetPasswordWithToken,
} from "../controllers/auth/resetPassword.controller.js";
import verifyAccount from "../controllers/auth/verifyAccount.controller.js";
import { login } from "../middlewares/auth.js";
import Express from "express";

const authRouter = (app) => {
  const router = Express.Router();

  router.post("/login", loggingin);
  router.post("/signup", signup);
  router.post("/forgotPassword", forgotPassword);
  router.put("/resetPassword/:token", resetPasswordWithToken);
  router.put("/verifyAccount/:token", verifyAccount);

  app.use("/v1/auth", router);
};

export default authRouter;
