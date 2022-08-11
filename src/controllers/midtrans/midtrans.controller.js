import headers from "../../services/midtrans";
import axios from "axios";
import "dotenv/config";

const body = {
  transaction_details: {
    order_id: "ORDER-101",
    gross_amount: 10000,
  },
};

export default async (req, res) => {
  try {
    const response = await axios.post(process.env.SANDBOX_SNAP_ENDPOINT, body, {
      headers,
    });
    res.send(response.data);
  } catch (err) {
    res.send(err.response.data);
  }
};
