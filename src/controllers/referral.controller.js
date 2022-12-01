import db from "../models/index.js";
const Referrals = db.referrals;

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// Fetch all referrals from the database (Done)
const findAll = (req, res) => {
  Referrals.find()
    .populate({
      path: "referralUser",
      select: "name username email",
    })
    .sort({ createdAt: -1 })
    .then((referrals) => {
      if (referrals.length < 0) {
        res.status(404).send({
          message: "Referrals not found",
        });
      }

      const data = referrals.map((referral) => {
        const {
          _id,
          referralCode,
          referralUser,
          referralCount,
          referralAccount,
          referralTotalAmount,
          referralAvailableAmount,
          referralWithDraw,
          referralWithDrawHistory,
          referralStatus,
          referralWithDrawBank,
        } = referral;
        return {
          id: _id,
          referralCode,
          referralUser,
          referralCount,
          referralAccount,
          referralTotalAmount,
          referralAvailableAmount,
          referralWithDraw,
          referralWithDrawHistory,
          referralStatus,
          referralWithDrawBank,
        };
      });

      res.send({
        message: "Referrals fetched successfully",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving referrals.",
      });
    });
};

// Find a single referral with an id (Done)
const findOne = (req, res) => {
  const id = req.params.id;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Invalid ID",
    });
  }

  Referrals.findById(id)
    .populate({
      path: "referralUser",
      select: "name username email",
    })
    .then((referral) => {
      if (!referral) {
        res.status(404).send({
          message: `Referral with id ${id} not found`,
        });
      }

      const {
        _id,
        referralCode,
        referralUser,
        referralCount,
        referralAccount,
        referralTotalAmount,
        referralAvailableAmount,
        referralWithDraw,
        referralWithDrawHistory,
        referralStatus,
        referralWithDrawBank,
      } = referral;

      res.send({
        message: "Referral fetched successfully",
        data: {
          id: _id,
          referralCode,
          referralUser,
          referralCount,
          referralAccount,
          referralTotalAmount,
          referralAvailableAmount,
          referralWithDraw,
          referralWithDrawHistory,
          referralStatus,
          referralWithDrawBank,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving referral with id ${id}`,
      });
    });
};

// Update a referral by the id in the request (Done)
const update = (req, res) => {
  const referralCode = req.params.referralCode;

  if (!referralCode) {
    return res.status(400).send({
      message: "Invalid ID",
    });
  }

  const { bankName, bankAccountName, bankAccountNumber } = req.body;
  var Code = req.body.code;

  if (!bankName || !bankAccountName || !bankAccountNumber) {
    return res.status(400).send({
      message: "Invalid data",
    });
  }

  if (!Code) {
    Code = referralCode;
  }

  Referrals.findOneAndUpdate(
    { referralCode },
    {
      referralCode: Code,
      referralWithDrawBank: {
        withDrawBankName: bankName,
        withDrawBankAccountName: bankAccountName,
        withDrawBankAccountNumber: bankAccountNumber,
      },
    },
    { new: true }
  )
    .then((referral) => {
      if (!referral) {
        res.status(404).send({
          message: `Referral with id ${id} not found`,
        });
      }

      res.send({
        message: "Referral updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating referral with id ${id}`,
      });
    });
};

// Verify a bank account of a referral by the id in the request (Done)
const verify = (req, res) => {
  const id = req.params.id;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Invalid ID",
    });
  }

  Referrals.findByIdAndUpdate(
    id,
    { referralWithDrawBank: { withDrawBankAccountVerified: true } },
    { new: true }
  )
    .then((referral) => {
      if (!referral) {
        res.status(404).send({
          message: `Referral with id ${id} not found`,
        });
      }

      res.send({
        message: "Referral account verified successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error updating referral with id ${id}`,
      });
    });
};

export { findAll, findOne, update, verify };
