const db = require("../models/index");
const News = db.news;

// Find All News (Done)
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

// Delete Function (Done)
exports.deleteNews = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "News Id is required",
    });
  }

  News.findByIdAndDelete(id)
    .then((news) => {
      if (!news) {
        res.status(404).send({
          message: `News with id ${id} not found.`,
        });
      }

      res.send({
        message: "News was deleted successfully",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while deleting news.",
      });
    });
};

// Create News (Need Testing)
exports.createNews = (req, res) => {
  const { title, author, category, tags, date, cover, body } = req.body;

  if (!title || !author || !category || !tags || !date || !cover || !body) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const news = new News({
    title,
    author,
    category,
    tags,
    date,
    cover,
    body,
  });

  news
    .save()
    .then((news) => {
      res.send({
        message: "News was created successfully",
        timestamp: new Date().toString(),
        data: news,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating news.",
      });
    });
};
