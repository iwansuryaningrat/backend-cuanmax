const db = require("../models/index");
const News = db.news;

exports.findAll = (req, res) => {
  News.find()
    .then((news) => {
      res.send({
        message: "All news were fetched successfully",
        timestamp: new Date().toISOString(),
        data: news,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving news.",
      });
    });
};
