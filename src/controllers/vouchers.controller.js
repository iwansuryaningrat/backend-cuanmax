const db = require("../models/index");
const Vouchers = db.vouchers;

exports.findAll = (req, res) => {
  Vouchers.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving vouchers.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Vouchers.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing voucher.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Vouchers.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Voucher not found",
        });
      }

      res.send({
        message: "Voucher was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete voucher.",
      });
    });
};
