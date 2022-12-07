import db from "../models/index.js";
const Videos = db.videos;
const Playlist = db.playlists;

// Find all videos for admin
const findAll = (req, res) => {
  Videos.find()
    .then((result) => {
      res.send({
        message: "Videos was successfully retrieved",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving videos.",
      });
    });
};

// Get Details of a video
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  Videos.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Video not found",
        });
      }

      res.send({
        message: "Video was successfully retrieved",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing videos.",
      });
    });
};

// Update a video
const update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  Videos.findByIdAndUpdate(id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Video not found",
        });
      }

      res.send({
        message: "Video was updated",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(409).send({
        message: err.message || "Some error while update video.",
      });
    });
};

// Delete a video
const deleteVideo = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  Videos.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Video not found",
        });
      }

      res.send({
        message: "Video was deleted",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(409).send({
        message: err.message || "Some error while delete video.",
      });
    });
};

// Find all videos by playlist
const findByPlaylist = (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  Videos.find({ playlist: { playlistId: playlistId } })
    .sort({ createdAt: 1 })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Video not found",
        });
      }

      res.send({
        message: "Videos was successfully retrieved",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing videos.",
      });
    });
};

// Create a video
const create = (req, res) => {
  const {
    title,
    description,
    playlistId,
    tags,
    category,
    date,
    duration,
    status,
  } = req.body;

  if (!title || !description || !playlistId || !category || !status) {
    return res.status(400).send({
      message:
        "Title, description, playlistId, category, and status is required",
    });
  }

  Playlist.findById(playlistId)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Playlist not found",
        });
      }

      const playlistTitle = result.name;

      const video = new Videos({
        title,
        description,
        playlist: { playlistId, playlistTitle },
        tags,
        category,
        date,
        duration,
        status,
      });

      video
        .save()
        .then((result) => {
          res.send({
            message: "Video was successfully created",
            timestamp: new Date().toString(),
            data: result,
          });
        })
        .catch((err) => {
          return res.status(500).send({
            message: err.message || "Some error while creating video.",
          });
        });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing videos.",
      });
    });
};

// Upload thumbnail
const uploadThumbnail = (req, res) => {
  const thumbnailName = req.file.filename;
  const thumbnailLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/images/${thumbnailName}`;

  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  if (!req.file) {
    return res.status(400).send({
      message: "Thumbnail file is required",
    });
  }

  Videos.findByIdAndUpdate(
    id,
    { thumbnail: { thumbnailName, thumbnailLink } },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Video not found",
        });
      }

      res.send({
        message: "Video was updated",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while update video.",
      });
    });
};

export {
  findAll,
  findOne,
  update,
  deleteVideo,
  findByPlaylist,
  create,
  uploadThumbnail,
};
