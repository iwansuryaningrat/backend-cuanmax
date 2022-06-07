module.exports = (app) => {
  const users = require("../controllers/users.controller");
  const auth = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth.auth, users.findAll);
  router.get("/:username/:referal", auth.auth, users.referal);
  router.get("/:id", auth.auth, users.findOne);
  router.put("/:id", auth.auth, users.update);
  router.put("/:id/changepassword", auth.auth, users.changePassword);
  router.put("/:id/changepicture", auth.auth, users.changeProfilePicture);
  router.delete("/:id", auth.auth, users.delete);

  app.use("/api/v1/users", router);
};
