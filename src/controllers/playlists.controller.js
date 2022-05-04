const db = require("../models/index");
const Playlists = db.playlists;

exports.findAll = (req, res) => {
  Playlists.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving playlists.",
      });
    });
};

exports.create = (req, res) => {
  const playlists = new Playlists({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    image: req.body.image,
    count: 0,
  });

  playlists
    .save(playlists)
    .then((result) => {
      res.status(200).send({
        message: "Playlist successfully added.",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while creating playlists.",
      });
    });
};
