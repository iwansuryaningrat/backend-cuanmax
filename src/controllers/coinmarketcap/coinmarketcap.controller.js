import axios from "axios";
import "dotenv/config";

// Done
const map = async (req, res) => {
  let response = null;
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
    return res.status(500).send({
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
const latest = async (req, res) => {
  let response = null;
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
    return res.status(500).send({
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
const info = async (req, res) => {
  const { symbol, id, slug } = req.query;

  if (!symbol && !id && !slug) {
    // error
    return res.status(400).send({
      message: "ID, Symbol, or Slug is required",
    });
  }

  let response = null;

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
    return res.status(500).send({
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
const price = async (req, res) => {
  const { symbol, id, slug } = req.query;
  let convert = req.query.convert;

  if (!symbol && !id && !slug) {
    // error
    return res.status(400).send({
      message: "ID, Symbol, or Slug is required",
    });
  }

  if (!convert) {
    convert = "USD";
  }

  let response = null;

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
    return res.status(500).send({
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

// Done
const convertCoin = async (req, res) => {
  const { id, symbol, amount, convert } = req.query;

  if (!id && !symbol) {
    // error
    return res.status(400).send({
      message: "ID or Symbol is required",
    });
  }

  if (!amount || !convert) {
    // error
    return res.status(400).send({
      message: "Amount and Convert are required",
    });
  }

  let response = null;

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
    return res.status(500).send({
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

export { map, latest, info, price, convertCoin };
