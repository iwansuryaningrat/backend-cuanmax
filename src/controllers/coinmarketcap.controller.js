/* Example in Node.js */
const axios = require("axios");
require("dotenv").config();

let result = null;
exports.latest = async (req, res) => {
  try {
    response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
          "content-type": "application/json; charset=utf-8",
        },
      }
    );
  } catch (ex) {
    response = null;
    // error
    res.status(500).send({
      message: ex.message,
    });
  }
  if (response) {
    // success
    const json = response.data;

    res.send(json);
  }
};
