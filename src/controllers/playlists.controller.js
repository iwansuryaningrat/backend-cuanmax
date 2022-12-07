import db from "../models/index.js";
const Playlists = db.playlists;

// Find All Playlists for Admin
const findAll = (req, res) => {
  const { category, videoLevel, status } = req.query;

  var query = {};

  if (category) query.category = category;
  if (videoLevel) query.videoLevel = videoLevel;
  if (status) query.status = status;

  Playlists.find(query)
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

// Find All Playlists for Pro User
const findAllforPro = (req, res) => {
  Playlists.find({ status: "Published" })
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

  Playlists.save({
    name,
    category,
    description,
    instructor,
    videoLevel,
    image: {
      imageName: photoName,
      imageLink: photoLink,
    },
  })
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

  if (!id) {
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

  if (!id) {
    return res.status(400).send({
      message: "Playlist ID is required",
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

export {
  findAll,
  findAllforPro,
  findAllforUsers,
  create,
  findOne,
  update,
  updateThumbnail,
  deletePlaylist,
};
