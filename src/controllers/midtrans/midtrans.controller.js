import headers from "../../services/midtrans.js";
import axios from "axios";
import "dotenv/config";

// Import Schemas
import db from "../../models/index.js";
const Transactions = db.transactions;
const Liveclass = db.liveclass;
const Pricing = db.pricing;
const Users = db.users;

const liveclassTransactions = (req, res) => {
  const { liveclassCode } = req.params;

  if (!liveclassCode) {
    return res.status(400).send({
      message: "Liveclass Code is required",
    });
  }

  const { userId, userName, userEmail } = req.body;

  if (!userId || !userName || !userEmail) {
    return res.status(400).send({
      message: "user id, user name and user email are required",
    });
  }

  Liveclass.findOne({ liveclassCode })
    .then((liveclass) => {
      if (!liveclass) {
        return res.status(404).send({
          message: "Liveclass not found",
        });
      }

      res.send({
        message: "Liveclass found",
        liveclass,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error fetching liveclass",
        error: err,
      });
    });
};

export { liveclassTransactions };

// Example of creating a transaction
// const body = {
//   transaction_details: {
//     order_id: "ORDER-101",
//     gross_amount: 10000,
//   },
// };

// export default async (req, res) => {
//   try {
//     const response = await axios.post(process.env.SANDBOX_SNAP_ENDPOINT, body, {
//       headers,
//     });
//     res.send(response.data);
//   } catch (err) {
//     res.send(err.response.data);
//   }
// };
