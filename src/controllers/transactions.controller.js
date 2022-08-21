import db from "../models/index.js";
const Transactions = db.transactions;

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

export { transactionsTest, createTransaction };
