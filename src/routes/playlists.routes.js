module.exports = (app) => {
  const {
    findAll,
    findOne,
    update,
    deletePlaylist,
  } = require("../controllers/playlists.controller");
  const { login, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", login, findAll);
  // router.post("/", playlists.create);
  router.get("/:id", login, proMember, findOne);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deletePlaylist);

  app.use("/api/v1/playlists", router);
};
