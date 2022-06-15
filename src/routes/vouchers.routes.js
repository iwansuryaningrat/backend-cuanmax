module.exports = (app) => {
  const {
    findAll,
    create,
    deleteVoucher,
  } = require("../controllers/vouchers.controller");
  const { auth } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth, findAll);
  router.post("/", auth, create);
  router.delete("/:id", auth, deleteVoucher);

  app.use("/api/v1/vouchers", router);
};
