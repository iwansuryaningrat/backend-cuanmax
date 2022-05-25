const db = require("../models/index");
const Services = db.services;

exports.findAll = (req, res) => {
  Services.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving services.",
      });
    });
};
