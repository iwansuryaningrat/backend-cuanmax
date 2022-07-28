const db = require("../models/index");
const Videos = db.videos;

exports.findAll = (req, res) => {
  Videos.find()
    .then((result) => {
      res.send({
        message: "Videos was successfully retrieved",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving videos.",
      });
    });
};

// Done
exports.findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  Videos.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
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
      res.status(500).send({
        message: err.message || "Some error while showing videos.",
      });
    });
};

// Done
exports.update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  Videos.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Video not found",
        });
      }

      res.send({
        message: "Video was updated",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while update video.",
      });
    });
};

// Done
exports.deleteVideo = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Video ID is required",
    });
  }

  Videos.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Video not found",
        });
      }

      res.send({
        message: "Video was deleted",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete video.",
      });
    });
};

// Done
exports.findByPlaylist = (req, res) => {
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
        res.status(404).send({
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
      res.status(500).send({
        message: err.message || "Some error while showing videos.",
      });
    });
};

// exports.create = (req, res) => {
//   const {
//     title,
//     description,
//     url,
//     playlist,
//     tags,
//     views,
//     likes,
//     dislikes,
//     duration,
//     category,
//     date,
//     status,
//   } = req.body;

//   const video = new Videos({
//     title,
//     description,
//     url,
//     thumbnail,
//     playlist,
//     tags,
//     views,
//     likes,
//     dislikes,
//     duration,
//     category,
//     date,
//     status,
//   });

//   video
//     .save()
//     .then((result) => {
//       res.send({
//         message: "Video was created",
//         timestamp: new Date().toString(),
//         data: result,
//       });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error while creating video.",
//       });
//     });
// };

exports.create = (req, res) => {
  // const thumbnailName = req.file.filename;
  // const thumbnail = `${req.protocol}://${req.get(
  //   "host"
  // )}/images/${thumbnailName}`;
  // const videoName = req.file.filename;
  // const video = `${req.protocol}://${req.get("host")}/videos/${videoName}`;
  // res.send({
  //   thumbnailName,
  //   thumbnail,
  //   videoName,
  //   video,
  // });
};
