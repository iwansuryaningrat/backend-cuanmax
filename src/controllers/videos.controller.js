import db from "../models/index.js";
const Videos = db.videos;

import updatePlaylistVideoCount from "./function/playlist.function.js";

// Find all videos for admin
const findAll = (req, res) => {
  const { status } = req.query;

  Videos.find({ status })
    .then((result) => {
      const data = result.map((video) => {
        const {
          _id,
          title,
          description,
          url,
          thumbnail,
          playlist,
          tags,
          views,
          likes,
          dislikes,
          duration,
          date,
          status,
        } = video;
        return {
          _id,
          title,
          description,
          url,
          thumbnail,
          playlist,
          tags,
          views,
          likes,
          dislikes,
          duration,
          date,
          status,
        };
      });

      res.send({
        message: "Videos was successfully retrieved",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving videos.",
      });
    });
};

// Find all videos for Pro Member
const findAllPro = (req, res) => {
  Videos.find({ status: "Published" })
    .then((result) => {
      const data = result.map((video) => {
        const {
          _id,
          title,
          description,
          url,
          thumbnail,
          playlist,
          tags,
          views,
          likes,
          dislikes,
          duration,
          date,
        } = video;
        return {
          _id,
          title,
          description,
          url,
          thumbnail,
          playlist,
          tags,
          views,
          likes,
          dislikes,
          duration,
          date,
        };
      });

      res.send({
        message: "Videos was successfully retrieved",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving videos.",
      });
    });
};

// Find all videos by playlist ID for Admin
const findByPlaylist = (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  Videos.find({ playlist: playlistId })
    .sort({ createdAt: 1 })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Video not found",
        });
      }

      const data = result.map((video) => {
        const {
          _id,
          title,
          description,
          url,
          thumbnail,
          playlist,
          tags,
          views,
          likes,
          dislikes,
          duration,
          date,
          status,
        } = video;
        return {
          _id,
          title,
          description,
          url,
          thumbnail,
          playlist,
          tags,
          views,
          likes,
          dislikes,
          duration,
          date,
          status,
        };
      });

      res.send({
        message: "Videos was successfully retrieved",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing videos.",
      });
    });
};

// Find all videos by playlist ID for Pro Member
const findByPlaylistPro = (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  Videos.find({ playlist: playlistId, status: "Published" })
    .sort({ createdAt: 1 })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Video not found",
        });
      }

      const data = result.map((video) => {
        const {
          _id,
          title,
          description,
          url,
          thumbnail,
          playlist,
          tags,
          views,
          likes,
          dislikes,
          duration,
          date,
        } = video;
        return {
          _id,
          title,
          description,
          url,
          thumbnail,
          playlist,
          tags,
          views,
          likes,
          dislikes,
          duration,
          date,
        };
      });

      res.send({
        message: "Videos was successfully retrieved",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing videos.",
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
      });
    })
    .catch((err) => {
      return res.status(409).send({
        message: err.message || "Some error while delete video.",
      });
    });
};

// Create a video and update playlist video count (DONE)
const create = async (req, res) => {
  const { playlistId, title, description, videoURL, tags, duration, status } =
    req.body;

  var thumbnailName = req.file.filename;
  var thumbnailLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/images/${thumbnailName}`;

  if (!title || !description || !playlistId || !videoURL) {
    return res.status(400).send({
      message:
        "Title, description, playlistId, videoURL, and status is required",
    });
  }

  if (!req.file) {
    thumbnailName = null;
    thumbnailLink = null;
  }

  const video = new Videos({
    title,
    description,
    url: videoURL,
    thumbnail: { thumbnailName, thumbnailLink },
    playlist: playlistId,
    tags,
    date: new Date().getTime(),
    duration,
    status,
  });

  const result = await video
    .save()
    .then((result) => {
      return true;
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while creating video.",
      });
    });

  if (result) {
    const updatePlaylist = await updatePlaylistVideoCount(playlistId);

    if (updatePlaylist === true) {
      res.send({
        message: "Video was created",
      });
    } else {
      return res.status(500).send({
        message: "Some error while creating video.",
      });
    }
  }
};

// Update thumbnail
const updateThumbnail = (req, res) => {
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
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while update video.",
      });
    });
};

// Update Video Status
const updateStatus = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  const { status } = req.body;

  Videos.findByIdAndUpdate(id, { status }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Video not found",
        });
      }

      res.send({
        message: "Video status was updated",
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
  findAllPro,
  findOne,
  findByPlaylist,
  findByPlaylistPro,
  update,
  deleteVideo,
  create,
  updateThumbnail,
  updateStatus,
};
