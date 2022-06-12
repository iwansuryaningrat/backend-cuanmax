const db = require("../models/index");
const Watchlist = db.watchlist;

// Done
exports.findAll = (req, res) => {
  const category = req.query.category;
  const tags = req.query.tags;
  const allData = req.query.allData;

  if (!category && !tags && !allData) {
    Watchlist.find({ isActive: true })
      .sort({ createdAt: -1 })
      .then((result) => {
        res.send({
          message: "Watchlist successfully fetched",
          timestamp: new Date().toString(),
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error while retrieving watchlists.",
        });
      });
  } else if (category && tags) {
    Watchlist.find({
      isActive: true,
      category: category,
      tags: { $in: tags.split(",") },
    })
      .sort({ createdAt: -1 })
      .then((result) => {
        res.send({
          message: "Watchlist successfully fetched",
          timestamp: new Date().toString(),
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error while retrieving watchlists.",
        });
      });
  } else if (tags) {
    Watchlist.find({ isActive: true, tags: { $in: tags.split(",") } })
      .sort({ createdAt: -1 })
      .then((result) => {
        res.send({
          message: "Watchlist successfully fetched",
          timestamp: new Date().toString(),
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error while retrieving watchlists.",
        });
      });
  } else if (category) {
    Watchlist.find({ isActive: true, category: category })
      .sort({ createdAt: -1 })
      .then((result) => {
        res.send({
          message: "Watchlist successfully fetched",
          timestamp: new Date().toString(),
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error while retrieving watchlists.",
        });
      });
  } else if (allData) {
    Watchlist.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.send({
          message: "Watchlist successfully fetched",
          timestamp: new Date().toString(),
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error while retrieving watchlists.",
        });
      });
  } else {
    Watchlist.find({ isActive: true })
      .sort({ createdAt: -1 })
      .then((result) => {
        res.send({
          message: "Watchlist successfully fetched",
          timestamp: new Date().toString(),
          data: result,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error while retrieving watchlists.",
        });
      });
  }
};

// Done
exports.findOne = (req, res) => {
  const id = req.params.id;

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
      res.status(500).send({
        message: err.message || "Some error while showing watchlist.",
      });
    });
};

// Done
exports.delete = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Watchlist ID is required",
    });
  }

  Watchlist.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Watchlist not found",
        });
      }

      res.send({
        message: "Watchlist was deleted",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while delete watchlist.",
      });
    });
};

// Done
exports.nonActivate = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send({
      message: "Watchlist ID is required",
    });
  }

  Watchlist.findByIdAndUpdate(id, { isActive: false })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Watchlist not found",
        });
      }

      res.send({
        message: "Watchlist was non-activated",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while delete watchlist.",
      });
    });
};

// Done
exports.create = (req, res) => {
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
      res.status(500).send({
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
      res.status(500).send({
        message: err.message || "Some error occurred while creating watchlist.",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

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

  Watchlist.findByIdAndUpdate(id, {
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
  })
    .then((result) => {
      if (!result) {
        res.status(404).send({
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
      res.status(500).send({
        message: err.message || "Some error occurred while updating watchlist.",
      });
    });
};
