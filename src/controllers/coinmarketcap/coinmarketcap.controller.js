const axios = require("axios");
require("dotenv").config();

exports.map = async (req, res) => {
  try {
    response = await axios.get(
      process.env.COINMARKETCAP_ENDPOINT +
        "v1/cryptocurrency/map?sort=cmc_rank",
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
    const json = response.data.data;

    res.send(json);
  }
};

exports.latest = async (req, res) => {
  try {
    response = await axios.get(
      process.env.COINMARKETCAP_ENDPOINT +
        "v1/cryptocurrency/listings/latest?start=1&limit=10&convert=USD",
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
    const json = response.data.data;

    res.send(json);
  }
};

exports.info = async (req, res) => {
  const symbol = req.query.symbol;

  try {
    response = await axios.get(
      process.env.COINMARKETCAP_ENDPOINT +
        `v2/cryptocurrency/info?symbol=${symbol}`,
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
    const data = response.data.data;

    res.send({
      message: "Cryptocurrency info retrieved successfully",
      timestamp: new Date().toString(),
      data: data,
    });
  }
};

exports.price = async (req, res) => {
  const symbol = req.body.symbol;

  try {
    response = await axios.get(
      process.env.COINMARKETCAP_ENDPOINT +
        `v2/cryptocurrency/quotes/latest?symbol=${symbol}&convert=USD`,
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
    const json = response.data.data;

    res.send(json);
  }
};

exports.convert = async (req, res) => {
  const symbol = req.body.symbol;
  const amount = req.body.amount;
  const convert = req.body.convert;

  try {
    response = await axios.get(
      process.env.COINMARKETCAP_ENDPOINT +
        `v2/tools/price-conversion?amount=${amount}&symbol=${symbol}&convert=${convert}`,
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
    const json = response.data.data;

    res.send(json);
  }
};
