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

exports.create = (req, res) => {
  const team = new Teams({
    name: req.body.name,
    position: req.body.position,
    photo: req.file.path,
    contact: {
      instagram: req.body.instagram,
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
    },
  });

  team
    .save(team)
    .then((result) => {
      res.status(200).send({
        message: "Team successfully added.",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while creating team.",
      });
    });
};
