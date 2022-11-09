import login from "../controllers/auth/login.controller.js";
import signup from "../controllers/auth/signup.controller.js";
import Express from "express";
import headers from "../services/headers.js";

const authRouter = (app) => {
  const router = Express.Router();

  app.use(headers);

  router.post("/login", login);
  router.post("/signup", signup);

  app.use("/api/v1", router);
};

export default authRouter;
