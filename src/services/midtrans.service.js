import "dotenv/config";
import base64 from "base-64";

const AUTH_STRING = base64.encode(
  process.env.SANDBOX_MIDTRANS_SERVER_KEY + ":"
);

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Basic " + AUTH_STRING,
};

export default headers;
