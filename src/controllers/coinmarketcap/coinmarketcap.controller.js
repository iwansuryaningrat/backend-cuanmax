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
      data: result,
    });
  }
};

// Get Top Assets Data (Done)
const topAssets = async (req, res) => {
  let { page, pageLimit } = req.query;
  let response = null;

  if (!page) {
    page = 1;
  }

  if (!pageLimit) {
    pageLimit = 10;
  }

  const start = (page - 1) * pageLimit + 1;

  try {
    response = await axios.get(
      process.env.COINMARKETCAP_ENDPOINT +
        `v1/cryptocurrency/listings/latest?start=${start}&limit=${pageLimit}&convert=USD&sort=market_cap&sort_dir=desc`,
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
    const data = result.map((item) => {
      const {
        id,
        name,
        symbol,
        slug,
        num_market_pairs,
        date_added,
        max_supply,
        total_supply,
        cmc_rank,
        last_updated,
        quote,
      } = item;
      const data = quote.USD;
      const dateAdded = new Date(date_added).toString();
      const lastUpdated = new Date(last_updated).toString();
      const changeData = {
        price: data.price,
        volume_24h: data.volume_24h,
        volume_change_24h: data.volume_change_24h,
        percent_change_1h: data.percent_change_1h,
        percent_change_24h: data.percent_change_24h,
        market_cap: data.market_cap,
        last_updated: new Date(data.last_updated).toString(),
      };

      const logo = `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;

      return {
        id,
        name,
        symbol,
        slug,
        logo,
        num_market_pairs,
        date_added: dateAdded,
        max_supply,
        total_supply,
        cmc_rank,
        last_updated: lastUpdated,
        quote: {
          USD: changeData,
        },
      };
    });

    res.send({
      message: "Cryptocurrency latest retrieved successfully",
      data,
    });
  }
};

// Get Top Gainer Data (Done)
const topGainers = async (req, res) => {
  let { page, pageLimit } = req.query;
  let response = null;

  if (!page) page = 1;

  if (!pageLimit) pageLimit = 10;

  const start = (page - 1) * pageLimit + 1;

  try {
    response = await axios.get(
      process.env.COINMARKETCAP_ENDPOINT +
        `v1/cryptocurrency/listings/latest?start=${start}&limit=${pageLimit}&convert=USD&sort=percent_change_1h&sort_dir=desc`,
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
    const data = result.map((item) => {
      const {
        id,
        name,
        symbol,
        slug,
        num_market_pairs,
        date_added,
        max_supply,
        total_supply,
        cmc_rank,
        last_updated,
        quote,
      } = item;
      const data = quote.USD;
      const dateAdded = new Date(date_added).toString();
      const lastUpdated = new Date(last_updated).toString();
      const changeData = {
        price: data.price,
        volume_24h: data.volume_24h,
        volume_change_24h: data.volume_change_24h,
        percent_change_1h: data.percent_change_1h,
        percent_change_24h: data.percent_change_24h,
        market_cap: data.market_cap,
        last_updated: new Date(data.last_updated).toString(),
      };

      const logo = `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`;

      return {
        id,
        name,
        symbol,
        slug,
        logo,
        num_market_pairs,
        date_added: dateAdded,
        max_supply,
        total_supply,
        cmc_rank,
        last_updated: lastUpdated,
        quote: {
          USD: changeData,
        },
      };
    });

    res.send({
      message: "Cryptocurrency latest retrieved successfully",
      data,
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
      data: result,
    });
  }
};

// Done
const convertCoin = async (req, res) => {
  const { symbol, amount, convert } = req.query;

  if (!symbol) {
    // error
    return res.status(400).send({
      message: "Symbol is required",
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
      data: result,
    });
  }
};

export { map, topAssets, info, price, convertCoin, topGainers };
