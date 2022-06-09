const db = require("../models/index");
const Teams = db.teams;

// Done
exports.findAll = (req, res) => {
  Teams.find()
    .then((result) => {
      res.send({
        message: "Teams successfully fetched.",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while retrieving teams.",
      });
    });
};

// Done
exports.findOne = (req, res) => {
  const id = req.params.id;

  Teams.findById(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing teams.",
      });
    });
};

// Done
exports.delete = (req, res) => {
  const id = req.params.id;

  Teams.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Team not found",
        });
      }

      res.send({
        message: "Team was deleted",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while delete team.",
      });
    });
};

// Done
exports.create = (req, res) => {
  const team = new Teams({
    name: req.body.name,
    description: req.body.description,
    position: req.body.position,
    contact: {
      instagram: req.body.instagram,
      email: req.body.email,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
    },
  });

  team
    .save(team)
    .then((result) => {
      res.status(200).send({
        message: "Team successfully added.",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      res.status(409).send({
        message: err.message || "Some error while creating team.",
        timestamp: new Date().toString(),
      });
    });
};

// Done
exports.update = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      message: "Teams ID is required",
    });
  }

  Teams.findByIdAndUpdate(id, req.body)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Team not found",
        });
      }

      res.send({
        message: "Team was updated",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while updating team.",
        timestamp: new Date().toString(),
      });
    });
};

// Done
exports.teamProfile = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send({
      message: "Teams ID is required",
    });
  }

  if (!req.file) {
    return res.status(422).send({
      message: "No file uploaded",
    });
  }

  const photoName = req.file.filename;
  const photoLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/foto/${photoName}`;

  Teams.findByIdAndUpdate(id, { photo: { photoName, photoLink } })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Team not found",
        });
      }

      res.send({
        message: "Team's profile picture updated successfully.",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while changing the profile picture.",
        timestamp: new Date().toString(),
      });
    });
};
