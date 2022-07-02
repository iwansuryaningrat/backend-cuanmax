const db = require("../models/index");
const Liveclass = db.liveclass;

// Find all liveclasses (Done)
exports.findAll = (req, res) => {
  const { status } = req.query;
  const query = status ? { status } : {};

  Liveclass.find(query)
    .sort({ createdAt: -1 })
    .then((liveclasses) => {
      res.send({
        message: "All liveclasses were fetched successfully",
        timestamp: new Date().toString(),
        data: liveclasses,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving liveclasses.",
      });
    });
};

// Find liveclass by id (Done)
exports.findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Live class Id is required",
    });
  }

  Liveclass.findById(id)
    .then((liveclass) => {
      if (!liveclass) {
        return res.status(404).send({
          message: "Liveclass not found with id " + id,
        });
      }
      res.send({
        message: "Liveclass was fetched successfully",
        timestamp: new Date().toString(),
        data: liveclass,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Error while retrieving liveclass",
      });
    });
};
