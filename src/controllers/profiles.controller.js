const db = require("../models/index");
const Profiles = db.profiles;

exports.findAll = (req, res) => {
  Profiles.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving profiles.",
      });
    });
};

exports.create = (req, res) => {};
