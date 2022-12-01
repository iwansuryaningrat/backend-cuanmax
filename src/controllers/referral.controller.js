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
        return res.status(404).send({
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
      return res.status(500).send({
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
        return res.status(404).send({
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
      return res.status(500).send({
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
        withDrawBankAccountVerified: false,
      },
    },
    { new: true }
  )
    .then((referral) => {
      if (!referral) {
        return res.status(404).send({
          message: `Referral with id ${id} not found`,
        });
      }

      res.send({
        message: "Referral updated successfully",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Error updating referral with id ${id}`,
      });
    });
};

// Request for a referral to withdraw (Done)
const requestWD = (req, res) => {
  const referralCode = req.params.referralCode;

  if (!referralCode) {
    return res.status(400).send({
      message: "Invalid ID",
    });
  }

  const { amount } = req.body;

  if (!amount) {
    return res.status(400).send({
      message: "Invalid data",
    });
  }

  Referrals.findOne({ referralCode })
    .then((referral) => {
      if (!referral) {
        return res.status(404).send({
          message: `Referral with id ${id} not found`,
        });
      }

      const { referralAvailableAmount } = referral;

      if (referralAvailableAmount < amount) {
        return res.status(400).send({
          message: "Insufficient balance",
        });
      }

      const newAvailableAmount = referralAvailableAmount - amount;
      const newTotalAmount = referral.referralTotalAmount - amount;
      const newReferralWithDrawCount = referral.referralWithDrawCount + 1;
      const withDrawAmount = amount;
      const withDrawDate = new Date().getTime();

      Referrals.findByIdAndUpdate(
        referral._id,
        {
          referralAvailableAmount: newAvailableAmount,
          referralTotalAmount: newTotalAmount,
          referralWithDrawCount: newReferralWithDrawCount,
          $push: {
            referralWithDrawHistory: {
              withDrawAmount,
              withDrawDate,
            },
          },
        },
        { new: true }
      )
        .then((referral) => {
          res.send({
            message: "Referral withdraw request sent successfully",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: `Error updating referral with id ${id}`,
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Error retrieving referral with id ${id}`,
      });
    });
};

// Show all referrals with verification bank account request (Done)
const showAllVerification = (req, res) => {
  Referrals.find({ "referralWithDrawBank.withDrawBankAccountVerified": false })
    .populate({
      path: "referralUser",
      select: "name username email",
    })
    .then((referrals) => {
      if (!referrals) {
        return res.status(404).send({
          message: `Referrals not found`,
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
          referralWithDrawCount,
          referralWithDrawHistory,
          referralStatus,
          referralWithDrawBank,
        } = referral;

        return {
          id: _id,
          referralUser,
          referralCode,
          referralCount,
          referralAccount,
          referralTotalAmount,
          referralAvailableAmount,
          referralWithDrawCount,
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
      return res.status(500).send({
        message: `Error retrieving referrals`,
      });
    });
};

// Show all referrals with withdraw request (withDrawStatus = "Pending") (Done)
const showAllWithdraw = (req, res) => {
  Referrals.find({
    referralWithDrawHistory: { $elemMatch: { withDrawStatus: "Pending" } },
  })
    .populate({
      path: "referralUser",
      select: "name username email",
    })
    .then((referrals) => {
      if (!referrals) {
        return res.status(404).send({
          message: `Referrals not found`,
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
          referralWithDrawCount,
          referralWithDrawHistory,
          referralStatus,
          referralWithDrawBank,
        } = referral;

        return {
          id: _id,
          referralUser,
          referralCode,
          referralCount,
          referralAccount,
          referralTotalAmount,
          referralAvailableAmount,
          referralWithDrawCount,
          referralWithDrawHistory,
          referralWithDrawBank,
          referralStatus,
        };
      });

      res.send({
        message: "Referrals fetched successfully",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Error retrieving referrals`,
      });
    });
};

// Verify bank account of a referral by the id in the request (Done)
const verifyBank = (req, res) => {
  const id = req.params.id;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Invalid ID",
    });
  }

  Referrals.findByIdAndUpdate(
    id,
    { "referralWithDrawBank.withDrawBankAccountVerified": true },
    { new: false }
  )
    .then((referral) => {
      if (!referral) {
        return res.status(404).send({
          message: `Referral with id ${id} not found`,
        });
      }

      res.send({
        message: "Referral bank account verified successfully",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Error updating referral with id ${id}`,
      });
    });
};

// Update withdraw status of a referral by the id in the request
const updateWDStatus = (req, res) => {
  const id = req.params.id;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Invalid ID",
    });
  }

  const { withDrawStatus } = req.body;

  if (!withDrawStatus) {
    return res.status(400).send({
      message: "Invalid data",
    });
  }

  Referrals.findByIdAndUpdate(
    id,
    {
      referralWithDrawHistory: {
        withDrawStatus,
        withDrawDate: new Date().getTime(),
      },
    },
    { new: true }
  )
    .then((referral) => {
      if (!referral) {
        return res.status(404).send({
          message: `Referral with id ${id} not found`,
        });
      }

      res.send({
        message: "Referral withdraw status updated successfully",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Error updating referral with id ${id}`,
      });
    });
};

export {
  findAll,
  findOne,
  update,
  requestWD,
  showAllVerification,
  showAllWithdraw,
  verifyBank,
  updateWDStatus,
};
