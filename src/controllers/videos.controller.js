import db from "../models/index.js";
const Videos = db.videos;
import dataCounter from "./function/dataCounter.function.js";

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

import {
  incrementPlaylistVideoCount,
  decrementPlaylistVideoCount,
} from "./function/playlist.function.js";

import {
  updateVideoUrl,
  updateVideoViews,
  updateVideoLikes,
  updateVideoDislikes,
  updatePlaylistVideo,
} from "./function/videos.function.js";

// Find all videos for admin (DONE)
const findAll = (req, res) => {
  const { status, page } = req.query;

  var condition = {};

  if (status) {
    condition = { status };
  }

  if (page === null) page = 1;

  const pageLimit = 10;
  const skip = pageLimit * (page - 1);
  const dataCount = dataCounter(Videos, pageLimit, condition);
  const pageData = {
    currentPage: page,
    pageCount: dataCount.pageCount,
    dataPerPage: pageLimit,
    dataCount: dataCount.dataCount,
  };

  Videos.find(condition)
    .populate({
      path: "playlist",
      select: "_id name videoLevel videoCount status",
    })
    .skip(skip)
    .limit(pageLimit)
    .sort({ createdAt: -1 })
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
          date: new Date(date).toString(),
          status,
        };
      });

      res.send({
        message: "Videos was successfully retrieved",
        data,
        page: pageData,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving videos.",
      });
    });
};

// Find all videos for Pro Member (DONE)
const findAllPro = async (req, res) => {
  const { page, pageLimit } = req.query;

  const condition = { status: "Published" };

  if (page === null) page = 1;
  if (pageLimit === null) pageLimit = 10;

  const skip = pageLimit * (page - 1);
  const dataCount = await dataCounter(Videos, pageLimit, condition);
  const pageData = {
    currentPage: page,
    pageCount: dataCount.pageCount,
    dataPerPage: pageLimit,
    dataCount: dataCount.dataCount,
  };

  await Videos.find(condition)
    .populate({
      path: "playlist",
      select: "_id name videoLevel videoCount",
    })
    .skip(skip)
    .limit(pageLimit)
    .sort({ createdAt: -1 })
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
          date: new Date(date).toString(),
        };
      });

      res.send({
        message: "Videos was successfully retrieved",
        data,
        page: pageData,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving videos.",
      });
    });
};

// Find all videos by playlist ID for Admin (DONE)
const findByPlaylist = (req, res) => {
  const { playlistId } = req.params;
  const { page } = req.query;

  if (!playlistId) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  const condition = { playlist: playlistId };

  if (page === null) page = 1;

  const pageLimit = 10;
  const skip = pageLimit * (page - 1);
  const dataCount = dataCounter(Videos, pageLimit, condition);
  const pageData = {
    currentPage: page,
    pageCount: dataCount.pageCount,
    dataPerPage: pageLimit,
    dataCount: dataCount.dataCount,
  };

  Videos.find(condition)
    .populate({
      path: "playlist",
      select: "_id name videoLevel videoCount status",
    })
    .skip(skip)
    .limit(pageLimit)
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
          date: new Date(date).toString(),
          status,
        };
      });

      res.send({
        message: "Videos was successfully retrieved",
        data,
        page: pageData,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing videos.",
      });
    });
};

// Find all videos by playlist ID for Pro Member (DONE)
const findByPlaylistPro = (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  Videos.find({ playlist: playlistId, status: "Published" })
    .populate({
      path: "playlist",
      select: "_id name videoLevel videoCount",
    })
    .sort({ createdAt: -1 })
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
          date: new Date(date).toString(),
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

// Get Details of a video by ID for Admin (DONE)
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  Videos.findById(id)
    .populate({
      path: "playlist",
      select: "_id name videoLevel videoCount status",
    })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Video not found",
        });
      }

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
      } = result;

      const data = {
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
        date: new Date(date).toString(),
      };

      res.send({
        message: "Video was successfully retrieved",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing videos.",
      });
    });
};

// Update a video
const update = async (req, res) => {
  const { id } = req.params;

  const { title, description, url, tags, duration, status } = req.body;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  if (url) {
    const response = await updateVideoUrl(id, url);
    if (response !== true) {
      return res.status(409).send({
        message: response,
      });
    }
  }

  Videos.findByIdAndUpdate(
    id,
    {
      title,
      description,
      tags,
      duration,
      status,
    },
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
      return res.status(409).send({
        message: err.message || "Some error while update video.",
      });
    });
};

// Delete a video
const deleteVideo = (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
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
    const updatePlaylist = await {
      incrementPlaylistVideoCount,
      decrementPlaylistVideoCount,
    }(playlistId);

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

  if (!id || !ObjectId.isValid(id)) {
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

  if (!id || !ObjectId.isValid(id)) {
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

// Change Video URL (Need to be tested)
const changeVideoUrl = async (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  const { url } = req.body;

  const result = await updateVideoUrl(id, url);

  if (result === true) {
    res.send({
      message: "Video URL was updated",
    });
  } else {
    return res.status(500).send({
      message: "Some error while update video.",
    });
  }
};

// Change Playlist Video (Need to be tested)
const changePlaylistVideo = async (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  const { playlistId } = req.body;

  const video = await Videos.findById(id);

  if (!video) {
    return res.status(404).send({
      message: "Video not found",
    });
  }

  const updatePlaylist = await {
    incrementPlaylistVideoCount,
    decrementPlaylistVideoCount,
  }(playlistId, video.playlist);

  if (updatePlaylist === true) {
    const result = await updatePlaylistVideo(id, playlistId);

    if (result === true) {
      res.send({
        message: "Video playlist was updated",
      });
    } else {
      return res.status(500).send({
        message: "Some error while update video.",
      });
    }
  } else {
    return res.status(500).send({
      message: "Some error while update video.",
    });
  }
};

// Watch video only for pro users if video is published (Need to be tested)
const watchVideo = async (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  const video = await Videos.findById(id).populate({
    path: "playlist",
    select: "_id name videoLevel videoCount",
  });

  if (!video) {
    return res.status(404).send({
      message: "Video not found",
    });
  }

  if (video.status !== "Published") {
    return res.status(400).send({
      message: "Video is not published",
    });
  }

  const updateViews = await updateVideoViews(id);

  if (updateViews === true) {
    const data = {
      title: video.title,
      description: video.description,
      url: video.url,
      thumbnail: video.thumbnail,
      playlist: video.playlist,
      tags: video.tags,
      views: video.views,
      likes: video.likes,
      dislikes: video.dislikes,
      duration: video.duration,
      date: new Date(video.date).toString(),
    };

    res.send({
      message: "Video successfully watched",
      data,
    });
  } else {
    return res.status(500).send({
      message: "Some error while watching video.",
    });
  }
};

// Like video only for pro users if video is published (Need to be tested)
const likeVideo = async (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  const video = await Videos.findById(id);

  if (!video) {
    return res.status(404).send({
      message: "Video not found",
    });
  }

  if (video.status !== "Published") {
    return res.status(400).send({
      message: "Video is not published",
    });
  }

  const updateLikes = await updateVideoLikes(id);

  if (updateLikes === true) {
    res.send({
      message: "Video was liked",
    });
  } else {
    return res.status(500).send({
      message: "Some error while update video likes.",
    });
  }
};

// Dislike video only for pro users if video is published (Need to be tested)
const dislikeVideo = async (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  const video = await Videos.findById(id);

  if (!video) {
    return res.status(404).send({
      message: "Video not found",
    });
  }

  if (video.status !== "Published") {
    return res.status(400).send({
      message: "Video is not published",
    });
  }

  const updateDislikes = await updateVideoDislikes(id);

  if (updateDislikes === true) {
    res.send({
      message: "Video was disliked",
    });
  } else {
    return res.status(500).send({
      message: "Some error while update video dislikes.",
    });
  }
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
  changeVideoUrl,
  changePlaylistVideo,
  watchVideo,
  likeVideo,
  dislikeVideo,
};
