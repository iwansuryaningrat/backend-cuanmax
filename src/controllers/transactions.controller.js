import db from "../models/index.js";
const Transactions = db.transactions;
const Users = db.users;

const transactionsTest = (req, res) => {
  const body = req.body;
  const params = req.params;
  const query = req.query;

  res.send({
    message: "Transactions were fetched successfully",
    timestamp: new Date().toString(),
    body,
    params,
    query,
  });
};

const createMemberTransaction = (req, res) => {
  const { memberId } = req.params;

  if (!memberId) {
    return res.status(400).send({
      message: "Member id is required",
    });
  }

  const { userId, userName, userEmail } = req.body;

  if (!userId || !userName || !userEmail) {
    return res.status(400).send({
      message: "User id, user name and user email are required",
    });
  }
};

const createTransaction = (req, res) => {
  const { memberId } = req.params;

  if (!memberId) {
    return res.status(400).send({
      message: "Member id is required",
    });
  }

  const { userId, userName, userEmail } = req.body;

  if (!userId || !userName || !userEmail) {
    return res.status(400).send({
      message: "User id, user name and user email are required",
    });
  }

  const newTransaction = {
    memberId,
    userId,
    userName,
    userEmail,
  };

  Transactions.create(newTransaction)
    .then((transaction) => {
      res.send(transaction);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Transaction.",
      });
    });
};

export { transactionsTest, createTransaction, createTransaction };
