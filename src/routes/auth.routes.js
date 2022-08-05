import login from "../controllers/login.controller.js";
import signup from "../controllers/signup.controller.js";
import Express from "express";

const authRouter = (app) => {
  const router = Express.Router();

  router.post("/login", login);
  router.post("/signup", signup);

  app.use("/api/v1", router);
};

export default authRouter;
