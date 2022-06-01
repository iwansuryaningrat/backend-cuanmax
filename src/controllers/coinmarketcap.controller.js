const axios = require("axios");
require("dotenv").config();

let result = null;
exports.latest = async (req, res) => {
  try {
    response = await axios.get(
      process.env.COINMARKETCAP_ENDPOINT +
        "v1/cryptocurrency/quotes/latest?symbol=BTC,ETH,DOGE",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
          "content-type": "application/json; charset=utf-8",
        },
      }
    );
  } catch (err) {
    response = null;
    // error
    res.status(500).send({
      message: err.message,
    });
  }
  if (response) {
    // success
    const json = response.data;

    res.send(json);
  }
};
