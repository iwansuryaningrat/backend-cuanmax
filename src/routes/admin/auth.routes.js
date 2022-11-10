import login from "../controllers/auth/login.controller.js";
import signup from "../controllers/auth/signup.controller.js";
import Express from "express";

const authRouter = (app) => {
  const router = Express.Router();

  router.post("/login", login);
  router.post("/signup", signup);

  app.use("/api/v1", router);
};

export default authRouter;
