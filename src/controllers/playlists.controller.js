const db = require("../models/index");
const Playlists = db.playlists;

exports.findAll = (req, res) => {
  Playlists.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error whike retrieving playlists.",
      });
    });
};
