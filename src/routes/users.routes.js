module.exports = (app) => {
  const users = require("../controllers/users.controller");
  const { auth, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth, users.findAll);
  router.get("/:id", auth, users.findOne);
  router.put("/:id", auth, users.update);
  router.put("/:id/changepassword", auth, users.changePassword);
  router.put("/:id/changepicture", auth, users.changeProfilePicture);
  router.delete("/:id", auth, users.delete);

  app.use("/api/v1/users", router);
};
