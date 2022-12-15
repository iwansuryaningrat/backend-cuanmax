import db from "../models/index.js";
const Watchlist = db.watchlist;
import dataCounter from "./function/dataCounter.function.js";

// Done
const findAll = (req, res) => {
  const { category, tags, allData } = req.query;
  const query = {};

  if (category) {
    query.category = category;
  }

  if (tags) {
    query.tags = { $in: tags.split(",") };
  }

  if (!allData) {
    query.isActive = true;
  }

  Watchlist.find(query)
    .sort({ createdAt: -1 })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Watchlist not found",
        });
      }

      res.send({
        message: "Watchlist fetched successfully",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving watchlist.",
      });
    });
};

// Done
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Watchlist ID is required",
    });
  }

  Watchlist.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Watchlist not found",
        });
      }

      res.send({
        message: "Watchlist successfully fetched",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing watchlist.",
      });
    });
};

// Done
const deleteWl = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Watchlist ID is required",
    });
  }

  Watchlist.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Watchlist not found",
        });
      }

      res.send({
        message: "Watchlist was deleted",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete watchlist.",
      });
    });
};

// Done
const nonActivate = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Watchlist ID is required",
    });
  }

  Watchlist.findByIdAndUpdate(id, { isActive: false }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Watchlist not found",
        });
      }

      res.send({
        message: "Watchlist was non-activated",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete watchlist.",
      });
    });
};

// Done
const create = (req, res) => {
  const {
    name,
    code,
    category,
    tags,
    sector,
    lastPrice,
    buyArea,
    stopLoss,
    TP1,
    TP2,
    TP3,
  } = req.body;

  if (
    !name ||
    !code ||
    !category ||
    !sector ||
    !lastPrice ||
    !buyArea ||
    !stopLoss ||
    !TP1
  ) {
    return res.status(400).send({
      message:
        "Name, code, category, sector, lastPrice, buyArea, stopLoss, and TP1 are required",
    });
  }

  Watchlist.findOne({ code: code, isActive: true })
    .then((result) => {
      if (result) {
        return res.status(400).send({
          message: "Watchlist already exists",
          timestamp: new Date().toString(),
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while creating watchlist.",
      });
    });

  const watchlist = new Watchlist({
    name: name,
    code: code,
    category: category,
    tags: tags,
    sector: sector,
    lastPrice: lastPrice,
    buyArea: buyArea,
    stopLoss: stopLoss,
    takeProfit: {
      TP1: TP1,
      TP2: TP2,
      TP3: TP3,
    },
    isActive: true,
  });

  watchlist
    .save()
    .then((result) => {
      res.send({
        message: "Watchlist was created successfully",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating watchlist.",
      });
    });
};

const update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Watchlist ID is required",
    });
  }

  const {
    name,
    code,
    category,
    tags,
    sector,
    lastPrice,
    buyArea,
    stopLoss,
    TP1,
    TP2,
    TP3,
  } = req.body;

  if (
    !name ||
    !code ||
    !category ||
    !sector ||
    !lastPrice ||
    !buyArea ||
    !stopLoss ||
    !TP1
  ) {
    return res.status(400).send({
      message:
        "Name, code, category, sector, lastPrice, buyArea, stopLoss, and TP1 are required",
    });
  }

  Watchlist.findByIdAndUpdate(
    id,
    {
      name: name,
      code: code,
      category: category,
      tags: tags,
      sector: sector,
      lastPrice: lastPrice,
      buyArea: buyArea,
      stopLoss: stopLoss,
      takeProfit: {
        TP1: TP1,
        TP2: TP2,
        TP3: TP3,
      },
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Watchlist not found",
        });
      }

      res.send({
        message: "Watchlist was updated successfully",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while updating watchlist.",
      });
    });
};

export { findAll, findOne, deleteWl, nonActivate, create, update };
