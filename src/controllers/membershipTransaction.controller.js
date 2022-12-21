import db from "../models/index.js";
const Users = db.users;
const Plans = db.plans;
const MembershipTransactions = db.membershipTransactions;
import createTransaction from "./midtrans/createPayment.function.js";

// Create and Save a new MembershipTransaction
const create = async (req, res) => {
  const { userId } = req.params;
  // Validate request (must have a membership id in params)
  if (!userId) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  const { membershipId, voucherCode, voucherDiscount, totalPrice } = req.body;

  // Validate request (must have a membership id in body)
  if (!membershipId) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }

  // Find the user
  const user = await Users.findById(userId);
  // Validate request (user must exist)
  if (!user) {
    return res.status(400).send({ message: "User not found!" });
  }

  // Find the membership
  const membership = await Plans.findById(membershipId);

  // Validate request (membership must exist)
  if (!membership) {
    return res.status(400).send({ message: "Membership not found!" });
  }

  const transaction_details = {
    order_id: `MS-${membership.planName}-${userId}`,
    gross_amount: totalPrice,
  };

  const items = [
    {
      id: membership._id,
      price: membership.price,
      quantity: 1,
      name: membership.planName,
    },
    {
      id: "DISCOUNT",
      price: membership.discountPrice,
      quantity: 1,
      name: "Discount",
    },
  ];

  if (voucherCode) {
    const voucherDiscountPrice = {
      id: "VOUCHER",
      price: -voucherDiscount,
      quantity: 1,
      name: "Voucher Discount",
    };
    items.push(voucherDiscountPrice);
  }

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

  const transaction = await createTransaction(
    transaction_details,
    items,
    customer_details
  );

  //   Create a MembershipTransaction
  const membershipTransaction = new MembershipTransactions({
    peymentCode: transaction.transaction_id,
    transactionName: "Membership Transaction for" + user.name,
    memberhipDuration: membership.duration,
    transactionAmount: transaction.gross_amount,
    transactionDate: new Date().toString(),
    transactionStatus: "Pending",
    transactionDescription: "Membership Transaction",
    transactionUser: userId,
    voucherCode,
  });

  // Save MembershipTransaction in the database
  membershipTransaction
    .save(membershipTransaction)
    .then((data) => {
      res.send({
        message: "MembershipTransaction was created successfully!",
        data: transaction,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the MembershipTransaction.",
      });
    });
};

// Retrieve all MembershipTransactions from the database.
const findAll = (req, res) => {};

export { create, findAll };
