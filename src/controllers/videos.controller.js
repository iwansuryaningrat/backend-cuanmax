const db = require("../models/index");
const Videos = db.Videos;

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
        message: err.message || "Some error while showing videos.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Videos.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Video not found",
        });
      }

      res.send({
        message: "Video was updated",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while update video.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Videos.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Video not found",
        });
      }

      res.send({
        message: "Video was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete video.",
      });
    });
};
