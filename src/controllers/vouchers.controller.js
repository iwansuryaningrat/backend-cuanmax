import db from "../models/index.js";
const Vouchers = db.vouchers;
const Users = db.users;

// Done
const findAll = (req, res) => {
  Vouchers.find()
    .then((result) => {
      return res.send({
        message: "Vouchers successfully fetched",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving vouchers.",
      });
    });
};

// Done
const create = (req, res) => {
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
      return res.status(500).send({
        message: err.message || "Some error while creating voucher.",
      });
    });
};

// Done
const deleteVoucher = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Voucher ID is required.",
    });
  }

  Vouchers.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Voucher not found",
        });
      }

      res.send({
        message: "Voucher was deleted",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete voucher.",
      });
    });
};

// Done
const update = (req, res) => {
  const { id } = req.params;

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
        return res.status(404).send({
          message: "Voucher not found",
        });
      }

      res.send({
        message: "Voucher was updated",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while update voucher.",
      });
    });
};

// Done
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Voucher ID is required.",
    });
  }

  Vouchers.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
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
      return res.status(500).send({
        message: err.message || "Some error while fetch voucher.",
      });
    });
};

const useVoucher = (req, res) => {
  const { username, voucherCode } = req.params;

  if (!username || !voucherCode) {
    return res.status(400).send({
      message: "Username and voucher code are required.",
    });
  }

  Users.findOne({ referal: { referalCode: voucherCode } })
    .then((result) => {
      if (!result) {
        Vouchers.findOne({ voucherCode })
          .then((result) => {
            if (!result) {
              return res.status(404).send({
                message: "Voucher not found",
              });
            }

            res.send({
              message: "Voucher successfully used",
              timestamp: new Date().toString(),
              data: result,
            });
          })
          .catch((err) => {
            return res.status(500).send({
              message: err.message || "Some error while fetch voucher.",
            });
          });
      }

      const email = result.email;

      Users.findOneAndUpdate(
        { email },
        {
          referalCount: result.referal.referalCount + 1,
          referalAccount: result.referal.referalAccount.push({ username }),
        }
      )
        .then((result) => {
          res.send({
            message: "Voucher successfully used",
            timestamp: new Date().toString(),
            data: result,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message || "Some error while use voucher.",
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while use voucher.",
      });
    });
};

export { findAll, create, deleteVoucher, update, findOne, useVoucher };
