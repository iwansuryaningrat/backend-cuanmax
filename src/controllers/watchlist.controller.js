const db = require("../models/index");
const Watchlist = db.watchlist;

exports.findAll = (req, res) => {
  Watchlist.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving watchlists.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Watchlist.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing watchlist.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Watchlist.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Watchlist not found",
        });
      }

      res.send({
        message: "Watchlist was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete watchlist.",
      });
    });
};
