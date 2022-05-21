const db = require("../models/index");
const Teams = db.teams;

exports.findAll = (req, res) => {
  Teams.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving teams.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Teams.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing teams.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Teams.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Team not found",
        });
      }

      res.send({
        message: "Team was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete team.",
      });
    });
};
