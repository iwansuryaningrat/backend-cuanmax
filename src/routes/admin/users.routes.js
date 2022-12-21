import {
  findAll,
  findOne,
  update,
  changePassword,
  changeProfilePicture,
  deleteUSer,
  changeProMemberToBasicMember,
} from "../../controllers/users.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import { userFinder } from "../../middlewares/usersfinder.js";
import Express from "express";
const router = Express.Router();

const usersAdminRouter = (app) => {
  router.get("/", admin, findAll);
  router.get("/:id", login, admin, findOne);
  router.put("/:id", login, admin, userFinder, update);
  router.put("/:id/changepassword", login, admin, userFinder, changePassword);
  router.put(
    "/:id/changepicture",
    login,
    admin,
    userFinder,
    changeProfilePicture
  );
  router.delete("/:id", login, admin, deleteUSer);
  router.put("/subsdeactivate", login, admin, changeProMemberToBasicMember);

  app.use("/v1/admin/users", router);
};

export default usersAdminRouter;
