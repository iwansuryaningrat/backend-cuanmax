const db = require("../models/index");
const Videos = db.videos;

exports.findAll = (req, res) => {
  Videos.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving videos.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Videos.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing video.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Videos.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete video.",
      });
    });
};
