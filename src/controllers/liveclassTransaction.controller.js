import db from "../models/index.js";
const LiveclassTransactions = db.liveclassTransactions;
import createTransaction from "./midtrans/createPayment.function.js";
import timeConvert from "./function/timeConverter.function.js";

// Create and Save a new MembershipTransaction
const create = async (req, res) => {
  const { userId } = req.params;
  // Validate request (must have a liveclass id in params)
  if (!userId) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }
};
