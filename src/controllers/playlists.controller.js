const db = require("../models/index");
const Playlists = db.playlists;

// Done
exports.findAll = (req, res) => {
  const { category, videoLevel } = req.params;

  const query = {};

  if (category) {
    query.category = category;
  }

  if (videoLevel) {
    query.videoLevel = videoLevel;
  }

  Playlists.find(query)
    .sort({ createdAt: -1 })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "All playlist were fetched successfully",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving playlists.",
      });
    });
};

// Done
exports.create = (req, res) => {
  const photoName = req.file.filename;
  const photoLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/images/${photoName}`;

  const playlists = new Playlists({
    name: req.body.name,
    category: req.body.category,
    description: req.body.description,
    image: {
      imageName: photoName,
      imageLink: photoLink,
    },
    videoCount: 0,
    status: "active",
  });

  playlists
    .save(playlists)
    .then((result) => {
      res.status(200).send({
        message: "Playlist successfully added.",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while creating playlists.",
      });
    });
};

// Done
exports.findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  Playlists.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist was fetched successfully",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing playlists.",
      });
    });
};

// Done
exports.update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  Playlists.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist was updated",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while update playlist.",
      });
    });
};

// Done
exports.deletePlaylist = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  Playlists.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist was deleted",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete playlist.",
      });
    });
};
