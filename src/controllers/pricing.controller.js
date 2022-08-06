import db from "../models/index.js";
const Pricing = db.pricing;

const findAll = (req, res) => {
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

const findOne = (req, res) => {
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

const deletePrice = (req, res) => {
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

export { findAll, findOne, deletePrice };
