import db from "../models/index.js";
const Teams = db.teams;

// Done
const findAll = (req, res) => {
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
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Team ID is required.",
    });
  }

  Teams.findById(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Team not found",
        });
      }

      res.send({
        message: "Team successfully retrieved.",
        timestamp: new Date().toString(),
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error while showing teams.",
      });
    });
};

// Done
const deleteTeam = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Team ID is required.",
    });
  }

  Teams.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Team not found",
        });
      }

      res.send({
        message: "Team successfully deleted.",
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
const create = (req, res) => {
  const { name, description, position, email } = req.body;

  if (!name || !description || !position || !email) {
    return res.status(400).send({
      message: "Please fill all required fields.",
    });
  }

  const team = new Teams({
    name: name,
    description: description,
    position: position,
    contact: {
      instagram: req.body.instagram,
      email: email,
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
      res.status(500).send({
        message: err.message || "Some error while creating team.",
        timestamp: new Date().toString(),
      });
    });
};

// Done
const update = (req, res) => {
  const { id } = req.params;

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
const teamProfile = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send({
      message: "Teams ID is required",
    });
  }

  if (!req.file) {
    return res.status(422).send({
      message: "Team profile photo is required.",
    });
  }

  const photoName = req.file.filename;
  const photoLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/images/${photoName}`;

  Teams.findByIdAndUpdate(id, { photo: { photoName, photoLink } })
    .then((result) => {
      if (!result) {
        res.status(404).send({
          message: "Team not found",
        });
      }

      res.send({
        message: "Team profile photo successfully updated.",
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

export { findAll, findOne, deleteTeam, create, update, teamProfile };
