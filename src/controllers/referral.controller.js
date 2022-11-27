import db from "../models/index.js";
const Referrals = db.referrals;

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// Fetch all referrals from the database
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

// Find a single referral with an id
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
