import {
  findAll,
  findOne,
  update,
  changePassword,
  changeProfilePicture,
  deleteUSer,
} from "../controllers/users.controller.js";
import { login, admin } from "../middlewares/auth.js";
import Express from "express";
const router = Express.Router();
import headers from "../services/headers.js";

const usersRouter = (app) => {
  app.use(headers);

  router.get("/", admin, findAll);
  router.get("/:id", login, findOne);
  router.put("/:id", login, update);
  router.put("/:id/changepassword", login, changePassword);
  router.put("/:id/changepicture", login, changeProfilePicture);
  router.delete("/:id", login, admin, deleteUSer);

  app.use("/api/v1/users", router);
};

export default usersRouter;
