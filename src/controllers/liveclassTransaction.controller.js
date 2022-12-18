import db from "../models/index.js";
const LiveclassTransactions = db.liveclassTransactions;
const Users = db.users;
const Liveclass = db.liveclass;
const Vouchers = db.vouchers;
const Referrals = db.referrals;
import createTransaction from "./midtrans/createPayment.function.js";
import timeConvert from "./function/timeConverter.function.js";

// Create and Save a new MembershipTransaction
const create = async (req, res) => {
  const { userId } = req.params;
  // Validate request (must have a liveclass id in params)
  if (!userId) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const { liveclassId, voucherCode } = req.body;

  // Validate request (must have a liveclass id in body)
  if (!liveclassId) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  // Find the user
  const user = await Users.findById(userId);
  // Validate request (user must exist)
  if (!user) {
    return res.status(400).send({ message: "User not found!" });
  }

  // Find the liveclass
  const liveclass = await Liveclass.findById(liveclassId);
  // Validate request (liveclass must exist)
  if (!liveclass) {
    return res.status(400).send({ message: "Liveclass not found!" });
  }

  // Check if user already bought the liveclass
  const isAlreadyBought = await LiveclassTransactions.findOne({
    _id: liveclassId,
    transactionUser: userId,
  });

  // Validate request (user must not have bought the liveclass)
  if (isAlreadyBought) {
    return res
      .status(400)
      .send({ message: "You have already bought this liveclass!" });
  }

  // Check user's voucher code (if any)
  let voucher = null;
  let referral = null;
  if (voucherCode) {
    // Find the voucher
    voucher = await Vouchers.findOne({ voucherCode });
    // if voucher not found, find referral code instead
  }

  // Check user's referral code (if any)
  if (!voucher) {
    // Find the referral
    referral = await Referrals.findOne({ referralCode: voucherCode });
  }

  // Validate request (referral must exist)
  if (!referral) {
    return res.status(400).send({ message: "Referral not found!" });
  }

  // Validate request (voucher must exist)
  if (!voucher) {
    return res.status(400).send({ message: "Voucher not found!" });
  }

  if (voucher.voucherQuota <= 0) {
    return res.status(400).send({ message: "Voucher quota is empty!" });
  }

  const transaction_details = {
    order_id: `LC-${liveclass.liveclassCode}-${user._id}`,
    gross_amount: liveclass.price,
  };

  const items = [
    {
      id: liveclass._id,
      price: liveclass.price,
      quantity: 1,
      name: liveclass.title,
    },
  ];

  // Split name into first name and last name
  const name = user.name.split(" ");
  const first_name = name[0];
  const last_name = name[1];

  const customer_details = {
    first_name,
    last_name,
    email: user.email,
    phone: user.phone,
  };

  // Create transaction
  const transaction = await createTransaction(
    transaction_details,
    items,
    customer_details
  );

  // Validate request (transaction must be created)
  if (!transaction) {
    return res.status(400).send({ message: "Transaction failed!" });
  }

  return res.status(200).send(transaction);

  // Create a LiveclassTransaction
  const liveclassTransaction = new LiveclassTransactions({});
};

export { create };
