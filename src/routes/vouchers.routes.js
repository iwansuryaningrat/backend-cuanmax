module.exports = (app) => {
  const {
    findAll,
    create,
    deleteVoucher,
    update,
    findOne,
  } = require("../controllers/vouchers.controller");
  const { auth, admin } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth, findAll);
  router.post("/", admin, create);
  router.get("/:id", auth, findOne);
  router.delete("/:id", admin, deleteVoucher);
  router.put("/:id", admin, update);

  app.use("/api/v1/vouchers", router);
};
