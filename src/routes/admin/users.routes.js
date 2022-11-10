import {
  findAll,
  findOne,
  update,
  changePassword,
  changeProfilePicture,
  deleteUSer,
} from "../../controllers/users.controller.js";
import { login, admin } from "../../middlewares/auth.js";
import Express from "express";
const router = Express.Router();

const usersAdminRouter = (app) => {
  router.get("/", admin, findAll);
  router.get("/:id", login, findOne);
  router.put("/:id", login, update);
  router.put("/:id/changepassword", login, changePassword);
  router.put("/:id/changepicture", login, changeProfilePicture);
  router.delete("/:id", login, admin, deleteUSer);

  app.use("/v1/admin/users", router);
};

export default usersAdminRouter;
