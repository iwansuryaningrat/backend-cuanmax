import midtransClient from "midtrans-client";
import "dotenv/config";

// Create Snap API instance
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SANDBOX_MIDTRANS_SERVER_KEY,
});

let parameter = {
  transaction_details: {
    order_id: "asahgsdwefh-123456",
    gross_amount: 10000,
  },
  credit_card: {
    secure: true,
  },
  item_details: [
    {
      id: "ITEM1",
      price: 10000,
      quantity: 1,
      name: "Midtrans Bear",
      brand: "Midtrans",
      category: "Toys",
      merchant_name: "Midtrans",
      url: "http://toko/toko1?item=abc",
    },
  ],
  customer_details: {
    first_name: "budi",
    last_name: "pratama",
    email: "budi.pra@example.com",
    phone: "08111222333",
  },
  expiry: {
    start_time: "2022-12-18 02:28:38 +07:00",
    unit: "hours",
    duration: 1,
  },
};

snap.createTransaction(parameter).then((transaction) => {
  // transaction token
  let transactionToken = transaction.token;
  console.log("transactionToken:", transaction);
});
