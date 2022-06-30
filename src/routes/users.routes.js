module.exports = (app) => {
  const {
    findAll,
    findOne,
    update,
    changePassword,
    changeProfilePicture,
    deleteUSer,
  } = require("../controllers/users.controller");
  const { auth, admin } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", admin, findAll);
  router.get("/:id", auth, findOne);
  router.put("/:id", auth, update);
  router.put("/:id/changepassword", auth, changePassword);
  router.put("/:id/changepicture", auth, changeProfilePicture);
  router.delete("/:id", admin, deleteUSer);

  app.use("/api/v1/users", router);
};
