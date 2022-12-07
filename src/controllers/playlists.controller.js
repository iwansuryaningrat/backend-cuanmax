import db from "../models/index.js";
const Playlists = db.playlists;

// Find All Playlists for Admin
const findAll = (req, res) => {
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
        return res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "All playlist were fetched successfully",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving playlists.",
      });
    });
};

// Find All Playlists for Pro User

// Find All Playlists for Basic User
const findAllforUsers = (req, res) => {
  Playlists.find({ status: "Published", videoLevel: "Beginner" })
    .sort({ createdAt: -1 })
    .limit(3)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Playlist not found",
        });
      }

      const data = result.map((item) => {
        return {
          id: item._id,
          name: item.name,
          category: item.category,
          description: item.description,
          instructor: item.instructor,
          videoLevel: item.videoLevel,
          image: item.image,
          videoCount: item.videoCount,
        };
      });

      res.send({
        message: "All playlist were fetched successfully",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving playlists.",
      });
    });
};

// Create a new Playlist
const create = (req, res) => {
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
      });
    })
    .catch((err) => {
      return res.status(409).send({
        message: err.message || "Some error while creating playlists.",
      });
    });
};

// Find details of a Playlist
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  Playlists.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist was fetched successfully",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing playlists.",
      });
    });
};

// Update a Playlist
const update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  Playlists.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist was updated",
      });
    })
    .catch((err) => {
      return res.status(409).send({
        message: err.message || "Some error while update playlist.",
      });
    });
};

// Delete a Playlist
const deletePlaylist = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  Playlists.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist was deleted",
      });
    })
    .catch((err) => {
      return res.status(409).send({
        message: err.message || "Some error while delete playlist.",
      });
    });
};

// Update Thumbnail of Playlist

export { findAll, findAllforUsers, create, findOne, update, deletePlaylist };
