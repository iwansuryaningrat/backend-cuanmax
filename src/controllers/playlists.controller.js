const db = require("../models/index");
const Playlists = db.playlists;

exports.findAll = (req, res) => {
  Playlists.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving playlists.",
      });
    });
};

// exports.create = (req, res) => {
//   const playlists = new Playlists({
//     name: req.body.name,
//     category: req.body.category,
//     description: req.body.description,
//     image: req.file.path,
//     videoCount: 0,
//   });

//   playlists
//     .save(playlists)
//     .then((result) => {
//       res.status(200).send({
//         message: "Playlist successfully added.",
//       });
//     })
//     .catch((err) => {
//       res.status(409).send({
//         message: err.message || "Some error while creating playlists.",
//       });
//     });
// };

exports.findOne = (req, res) => {
  const { id } = req.params;

  Playlists.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing playlists.",
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;

  Playlists.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist was updated",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while update playlist.",
      });
    });
};

exports.deletePlaylist = (req, res) => {
  const { id } = req.params;

  Playlists.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist was deleted",
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete playlist.",
      });
    });
};
