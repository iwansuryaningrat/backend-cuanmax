module.exports = (app) => {
  const {
    findAll,
    create,
    deleteVoucher,
    update,
    findOne,
  } = require("../controllers/vouchers.controller");
  const { login, admin } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", login, admin, findAll);
  router.post("/", login, admin, create);
  router.get("/:id", login, findOne);
  router.delete("/:id", login, admin, deleteVoucher);
  router.put("/:id", login, admin, update);

  app.use("/api/v1/vouchers", router);
};
