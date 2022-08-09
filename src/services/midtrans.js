// const midtransClient = require("midtrans-client"); // Create Snap API instance
import midtransClient from "midtrans-client";
import "dotenv/config";

let snap = new midtransClient.Snap({
  // Set to true if you want Production Environment (accept real transaction).
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY, // Server key for production environment
});

let parameter = {
  transaction_details: {
    order_id: "YOUR-ORDERID-123456",
    gross_amount: 10000,
  },
  credit_card: { secure: true },
  customer_details: {
    first_name: "budi",
    last_name: "pratama",
    email: "budi.pra@example.com",
    phone: "08111222333",
  },
};

snap
  .createTransaction(parameter)
  .then((transaction) => {
    // transaction token
    let transactionToken = transaction.token;
    console.log("transactionToken:", transactionToken);
  })
  .catch((error) => {
    console.log(error);
  });
