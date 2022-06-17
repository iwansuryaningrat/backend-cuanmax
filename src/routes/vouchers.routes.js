module.exports = (app) => {
  const {
    findAll,
    create,
    deleteVoucher,
    update,
    findOne,
  } = require("../controllers/vouchers.controller");
  const { auth, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", auth, findAll);
  router.post("/", auth, create);
  router.get("/:id", auth, findOne);
  router.delete("/:id", auth, deleteVoucher);
  router.put("/:id", auth, update);

  app.use("/api/v1/vouchers", router);
};
