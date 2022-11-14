import {
  findOne,
  update,
  changePassword,
  changeProfilePicture,
  createReferalCode,
} from "../../controllers/users.controller.js";
import { login, proMember } from "../../middlewares/auth.js";
import userFinder from "../../middlewares/usersfinder.js";
import Express from "express";
const router = Express.Router();

const usersProRouter = (app) => {
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
  router.put(
    "/:id/createreferalcode",
    login,
    proMember,
    userFinder,
    createReferalCode
  );

  app.use("/v1/pro/users", router);
};

export default usersProRouter;
