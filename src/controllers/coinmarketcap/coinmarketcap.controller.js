const axios = require("axios");
require("dotenv").config();

// Done
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
    const result = response.data.data;

    res.send({
      message: "Cryptocurrency map retrieved successfully",
      timestamp: new Date().toString(),
      data: result,
    });
  }
};

// Done
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
    const result = response.data.data;

    res.send({
      message: "Cryptocurrency latest retrieved successfully",
      timestamp: new Date().toString(),
      data: result,
    });
  }
};

// Done
exports.info = async (req, res) => {
  const symbol = req.query.symbol;
  const id = req.query.id;
  const slug = req.query.slug;

  if (!symbol && !id && !slug) {
    // error
    res.status(400).send({
      message: "ID, Symbol, or Slug is required",
    });
  }

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

// Done
exports.price = async (req, res) => {
  const symbol = req.query.symbol;
  const id = req.query.id;
  const slug = req.query.slug;
  let convert = req.query.convert;

  if (!symbol && !id && !slug) {
    // error
    res.status(400).send({
      message: "ID, Symbol, or Slug is required",
    });
  }

  if (!convert) {
    convert = "USD";
  }

  try {
    response = await axios.get(
      process.env.COINMARKETCAP_ENDPOINT +
        `v2/cryptocurrency/quotes/latest?symbol=${symbol}&convert=${convert}`,
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
    const result = response.data.data;

    res.send({
      message: "Cryptocurrency price retrieved successfully",
      timestamp: new Date().toString(),
      data: result,
    });
  }
};

exports.convert = async (req, res) => {
  const id = req.query.id;
  const symbol = req.query.symbol;
  const amount = req.query.amount;
  const convert = req.query.convert;

  if (!id && !symbol) {
    // error
    res.status(400).send({
      message: "ID or Symbol is required",
    });
  }

  if (!amount || !convert) {
    // error
    res.status(400).send({
      message: "Amount and Convert are required",
    });
  }

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
    const result = response.data.data;

    res.send({
      message: "Cryptocurrency convert retrieved successfully",
      timestamp: new Date().toString(),
      data: result,
    });
  }
};
