import {
  findOne,
  update,
  changePassword,
  changeProfilePicture,
} from "../../controllers/users.controller.js";
import { login } from "../../middlewares/auth.js";
import userFinder from "../../middlewares/usersfinder.js";
import Express from "express";
const router = Express.Router();

const usersRouter = (app) => {
  router.get("/:id", login, userFinder, findOne);
  router.put("/:id", login, userFinder, update);
  router.put("/:id/changepassword", login, userFinder, changePassword);
  router.put("/:id/changepicture", login, userFinder, changeProfilePicture);

  app.use("/v1/users", router);
};

export default usersRouter;
