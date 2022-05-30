const db = require("../models/index");
const Pricing = db.pricing;

exports.findAll = (req, res) => {
  Pricing.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving pricing.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Pricing.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing pricing.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Pricing.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Pricing not found",
        });
      }

      res.send({
        message: "Pricing was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete pricing.",
      });
    });
};
