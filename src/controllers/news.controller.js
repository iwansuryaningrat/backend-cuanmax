const db = require("../models/index");
const News = db.news;

// Done
exports.findAll = (req, res) => {
  const { tag, category } = req.query;
  const query = {};

  if (tag) {
    query.tags = tag;
  }

  if (category) {
    query.category = category;
  }

  News.find(query)
    .sort({ createdAt: -1 })
    .then((news) => {
      res.send({
        message: "All news were fetched successfully",
        timestamp: new Date().toString(),
        data: news,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving news.",
      });
    });
};
