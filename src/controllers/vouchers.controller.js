const db = require("../models/index");
const Vouchers = db.vouchers;

// Done
exports.findAll = (req, res) => {
  Vouchers.find()
    .then((result) => {
      res.send({
        message: "Vouchers successfully fetched",
        timestamp: new Date().toString(),
        data: result,
      });
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

exports.create = (req, res) => {
  const voucher = new Vouchers({
    voucherCode: req.body.voucherCode,
    voucherName: req.body.voucherName,
    voucherDescription: req.body.voucherDescription,
    voucherDiscount: req.body.voucherDiscount,
    voucherType: req.body.voucherType,
    voucherExpiry: req.body.voucherExpiry,
  });

  voucher
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while creating voucher.",
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
