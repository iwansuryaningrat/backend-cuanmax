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

// Done
exports.create = (req, res) => {
  const {
    voucherCode,
    voucherName,
    voucherDescription,
    voucherDiscount,
    voucherQuota,
    voucherType,
  } = req.body;

  if (!voucherCode || !voucherName || !voucherDiscount || !voucherQuota) {
    return res.status(400).send({
      message: "Voucher code, name, discount and quota are required.",
    });
  }

  const voucher = new Vouchers({
    voucherCode,
    voucherName,
    voucherDescription,
    voucherDiscount,
    voucherQuota,
    voucherType,
  });

  voucher
    .save()
    .then((result) => {
      res.send({
        message: "Voucher was created",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while creating voucher.",
      });
    });
};

// Done
exports.deleteVoucher = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Voucher ID is required.",
    });
  }

  Vouchers.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Voucher not found",
        });
      }

      res.send({
        message: "Voucher was deleted",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while delete voucher.",
      });
    });
};

// Done
exports.update = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Voucher ID is required.",
    });
  }

  const {
    voucherCode,
    voucherName,
    voucherDescription,
    voucherDiscount,
    voucherQuota,
    voucherType,
    isActive,
    forNewUser,
  } = req.body;

  Vouchers.findByIdAndUpdate(id, {
    voucherCode,
    voucherName,
    voucherDescription,
    voucherDiscount,
    voucherQuota,
    voucherType,
    isActive,
    forNewUser,
  })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Voucher not found",
        });
      }

      res.send({
        message: "Voucher was updated",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while update voucher.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Voucher ID is required.",
    });
  }

  Vouchers.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Voucher not found",
        });
      }

      res.send({
        message: "Voucher was fetched",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while fetch voucher.",
      });
    });
};
