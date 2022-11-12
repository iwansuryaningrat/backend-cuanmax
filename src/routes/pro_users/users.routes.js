import {
  findOne,
  update,
  changePassword,
  changeProfilePicture,
} from "../controllers/users.controller.js";
import { login, proMember } from "../middlewares/auth.js";
import userFinder from "../../middlewares/usersfinder.js";
import Express from "express";
const router = Express.Router();

const usersRouter = (app) => {
  router.get("/:id", login, proMember, userFinder, findOne);
  router.put("/:id", login, proMember, userFinder, update);
  router.put(
    "/:id/changepassword",
    login,
    proMember,
    userFinder,
    changePassword
  );
  router.put(
    "/:id/changepicture",
    login,
    proMember,
    userFinder,
    changeProfilePicture
  );

  app.use("/api/v1/users", router);
};

export default usersRouter;
