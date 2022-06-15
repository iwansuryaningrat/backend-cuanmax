module.exports = (app) => {
  const {
    findAll,
    create,
    deleteVoucher,
    update,
  } = require("../controllers/vouchers.controller");
  const { auth } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth, findAll);
  router.post("/", auth, create);
  router.delete("/:id", auth, deleteVoucher);
  router.put("/:id", auth, update);

  app.use("/api/v1/vouchers", router);
};
