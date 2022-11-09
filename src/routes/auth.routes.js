import loggingin from "../controllers/auth/login.controller.js";
import signup from "../controllers/auth/signup.controller.js";
import {
  resetPassword,
  forgotPassword,
  resetPasswordWithToken,
} from "../controllers/auth/resetPassword.controller.js";
import { login } from "../middlewares/auth.js";
import Express from "express";
import headers from "../services/headers.js";

const authRouter = (app) => {
  const router = Express.Router();

  app.use(headers);

  router.post("/login", loggingin);
  router.post("/signup", signup);
  router.put("/resetPassword", login, resetPassword);
  router.post("/forgotPassword", forgotPassword);
  router.put("/resetPassword/:token", resetPasswordWithToken);

  app.use("/v1/auth", router);
};

export default authRouter;
