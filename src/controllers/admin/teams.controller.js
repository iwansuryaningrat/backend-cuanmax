import db from "../../models/index.js";
const Teams = db.teams;

// Fetch all teams data (DONE)
const findAll = (req, res) => {
  const { active } = req.query;

  let condition = active ? { status: "Active" } : {};

  Teams.find(condition)
    .then((result) => {
      const data = result.map((item) => {
        const { _id, name, description, position, photo, contact } = item;
        return {
          id: _id,
          name,
          description,
          position,
          photo,
          contact,
        };
      });

      // Check if there is any data
      if (data.length === 0) {
        return res.status(404).send({
          message: "No data found.",
        });
      }

      res.send({
        message: "Teams successfully fetched.",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving teams.",
      });
    });
};

// Fetch one team data (DONE)
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
        return res.status(404).send({
          message: "Team not found",
        });
      }

      const data = result.map((item) => {
        const { _id, name, description, position, photo, contact } = item;
        return {
          id: _id,
          name,
          description,
          position,
          photo,
          contact,
        };
      });

      res.send({
        message: "Team successfully retrieved.",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing teams.",
      });
    });
};

// Delete team data (DONE)
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
        return res.status(404).send({
          message: "Team not found",
        });
      }

      res.send({
        message: "Team successfully deleted.",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete team.",
      });
    });
};

// Create and Save a new Team data (Done)
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
    .save()
    .then((result) => {
      res.status(200).send({
        message: "Team successfully created.",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while creating team.",
      });
    });
};

// Update a Team by the id in the request (DONE)
const update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Teams ID is required",
    });
  }

  const data = req.body.map((item) => {
    const { name, description, position, email, instagram, twitter, linkedin } =
      item;
    return {
      name,
      description,
      position,
      contact: {
        email,
        instagram: instagram === null ? "" : instagram,
        twitter: twitter === null ? "" : twitter,
        linkedin: linkedin === null ? "" : linkedin,
      },
    };
  });

  Teams.findByIdAndUpdate(id, data, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Team not found",
        });
      }

      res.send({
        message: "Team data successfully updated.",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while updating team.",
      });
    });
};

// Upload photo (DONE)
const teamProfilePicture = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
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
        return res.status(404).send({
          message: "Team not found",
        });
      }

      res.send({
        message: "Team profile photo successfully updated.",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message ||
          "Some error occurred while changing the profile picture.",
      });
    });
};

// Deactivate Team (DONE)
const deactivate = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Teams ID is required",
    });
  }

  Teams.findByIdAndUpdate(id, { status: "Inactive" })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Team not found",
        });
      }

      res.send({
        message: "Team successfully deactivated.",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while deactivating team.",
      });
    });
};

export {
  findAll,
  findOne,
  deleteTeam,
  create,
  update,
  teamProfilePicture,
  deactivate,
};
