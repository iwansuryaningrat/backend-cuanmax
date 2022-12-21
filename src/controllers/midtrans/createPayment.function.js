import midtransClient from "midtrans-client";
import "dotenv/config";

import timeConvert from "../function/timeConverter.function.js";

// Create Snap API instance
const createTransaction = async (
  transaction_details,
  items,
  customer_details
) => {
  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SANDBOX_MIDTRANS_SERVER_KEY,
  });

  const time = timeConvert(new Date());

  let parameter = {
    transaction_details,
    credit_card: {
      secure: true,
    },
    item_details: items,
    customer_details,
    expiry: {
      start_time: time,
      unit: "hours",
      duration: 1,
    },
  };

  const transaction = await snap.createTransaction(parameter);
  return transaction;
};

export default createTransaction;
