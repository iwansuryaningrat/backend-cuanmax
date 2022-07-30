module.exports = (app) => {
  const {
    // create,
    findAll,
    findOne,
    findByPlaylist,
    update,
    deleteVideo,
  } = require("../controllers/videos.controller");
  const { login, admin, proMember } = require("../middlewares/auth");
  const router = require("express").Router();

  router.get("/", login, proMember, findAll);
  router.get("/:id", login, proMember, findOne);
  router.get("/:playlistId", login, proMember, findByPlaylist);
  router.put("/:id", login, admin, update);
  router.delete("/:id", login, admin, deleteVideo);
  // router.post("/", create);

  app.use("/api/v1/videos", router);
};
