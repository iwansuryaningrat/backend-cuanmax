import db from "../models/index.js";
const Playlists = db.playlists;
import dataCounter from "./function/dataCounter.function.js";

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// Find All Playlists for Admin
const findAll = async (req, res) => {
  let { category, videoLevel, status, page } = req.query;

  var query = {};

  if (category) query.category = category;
  if (videoLevel) query.videoLevel = videoLevel;
  if (status) query.status = status;

  if (page === undefined) page = 1;

  const pageLimit = 10;
  const skip = pageLimit * (page - 1);
  const dataCount = await dataCounter(Playlists, pageLimit, query);
  const pageData = {
    currentPage: page,
    pageCount: dataCount.pageCount,
    dataPerPage: pageLimit,
    dataCount: dataCount.dataCount,
  };

  await Playlists.find(query)
    .skip(skip)
    .limit(pageLimit)
    .sort({ createdAt: -1 })
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
        page: pageData,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving playlists.",
      });
    });
};

// Find All Playlists name and id for Admin
const findAllNameId = (req, res) => {
  Playlists.find()
    .sort({ createdAt: -1 })
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
          status: item.status,
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

// Find All Playlists for Pro User
const findAllforPro = async (req, res) => {
  let { page, pageLimit } = req.query;

  const query = { status: "Published" };

  if (page === undefined) page = 1;
  if (pageLimit === undefined) pageLimit = 10;

  const skip = pageLimit * (page - 1);
  const dataCount = await dataCounter(Playlists, pageLimit, query);
  const pageData = {
    currentPage: page,
    pageCount: dataCount.pageCount,
    dataPerPage: pageLimit,
    dataCount: dataCount.dataCount,
  };

  await Playlists.find(query)
    .skip(skip)
    .limit(pageLimit)
    .sort({ createdAt: -1 })
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
        page: pageData,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving playlists.",
      });
    });
};

// Find All Playlists for Basic User
const findAllforUsers = (req, res) => {
  Playlists.find({ status: "Published", videoLevel: "Beginner" })
    .limit(3)
    .sort({ createdAt: -1 })
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
  if (!req.file) {
    return res.status(400).send({
      message: "Image is required",
    });
  }

  const photoName = req.file.filename;
  const photoLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/images/${photoName}`;

  const { name, category, description, instructor, videoLevel } = req.body;

  if (!name || !description || !videoLevel) {
    return res.status(400).send({
      message: "Name, Description and Video Level are required",
    });
  }

  const playlist = new Playlists({
    name,
    category,
    description,
    instructor,
    videoLevel,
    image: {
      imageName: photoName,
      imageLink: photoLink,
    },
  });

  playlist
    .save()
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

  if (!id || !ObjectId.isValid(id)) {
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

      const data = {
        id: result._id,
        name: result.name,
        category: result.category,
        description: result.description,
        instructor: result.instructor,
        videoLevel: result.videoLevel,
        image: result.image,
        videoCount: result.videoCount,
      };

      res.send({
        message: "Playlist was fetched successfully",
        data,
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

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  const { name, category, description, instructor, videoLevel } = req.body;

  Playlists.findByIdAndUpdate(
    id,
    {
      name,
      category,
      description,
      instructor,
      videoLevel,
    },
    { new: true }
  )
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

// Update Thumbnail of Playlist
const updateThumbnail = (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  if (!req.file) {
    return res.status(400).send({
      message: "Image is required",
    });
  }

  const photoName = req.file.filename;
  const photoLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/images/${photoName}`;

  Playlists.findByIdAndUpdate(
    id,
    {
      image: {
        imageName: photoName,
        imageLink: photoLink,
      },
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist thumbnail was updated",
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

  if (!id || !ObjectId.isValid(id)) {
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

// Change Playlist Status
const changeStatus = (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Playlist ID is required",
    });
  }

  const { status } = req.body;

  Playlists.findByIdAndUpdate(
    id,
    {
      status,
    },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Playlist not found",
        });
      }

      res.send({
        message: "Playlist status was updated",
      });
    })
    .catch((err) => {
      return res.status(409).send({
        message: err.message || "Some error while update playlist.",
      });
    });
};

export {
  findAll,
  findAllNameId,
  findAllforPro,
  findAllforUsers,
  create,
  findOne,
  update,
  updateThumbnail,
  deletePlaylist,
  changeStatus,
};
