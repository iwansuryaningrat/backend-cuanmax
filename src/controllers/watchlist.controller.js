const db = require("../models/index");
const Watchlist = db.watchlist;

// Done
exports.findAll = (req, res) => {
  Watchlist.find({ isActive: true })
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
