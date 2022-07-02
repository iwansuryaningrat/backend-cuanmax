module.exports = (app) => {
  const {
    findAll,
    findOne,
    update,
    changePassword,
    changeProfilePicture,
    deleteUSer,
  } = require("../controllers/users.controller");
  const { login, admin } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", admin, findAll);
  router.get("/:id", login, findOne);
  router.put("/:id", login, update);
  router.put("/:id/changepassword", login, changePassword);
  router.put("/:id/changepicture", login, changeProfilePicture);
  router.delete("/:id", login, admin, deleteUSer);

  app.use("/api/v1/users", router);
};
