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
