import db from "../models/index.js";
const News = db.news;

// Find All News (Done)
const findAll = (req, res) => {
  const { tags, category } = req.query;
  const query = {};

  if (tags) {
    query.tags = { $in: tags.split(",") };
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
      return res.status(500).json({
        message: err.message || "Some error occurred while retrieving news.",
      });
    });
};

// Delete Function (Done)
const deleteNews = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "News Id is required",
    });
  }

  News.findByIdAndDelete(id)
    .then((news) => {
      if (!news) {
        return res.status(404).send({
          message: `News with id ${id} not found.`,
        });
      }

      res.send({
        message: "News was deleted successfully",
        timestamp: new Date().toString(),
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "Some error occurred while deleting news.",
      });
    });
};

// Create News (Need Testing)
const createNews = (req, res) => {
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
      return res.send({
        message: "News was created successfully",
        timestamp: new Date().toString(),
        data: news,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "Some error occurred while creating news.",
      });
    });
};

// Find News by Id (Done)
const findById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "News Id is required",
    });
  }

  News.findById(id)
    .then((news) => {
      if (!news) {
        return res.status(404).send({
          message: `News with id ${id} not found.`,
        });
      }

      res.send({
        message: "News was fetched successfully",
        timestamp: new Date().toString(),
        data: news,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "Some error occurred while retrieving news.",
      });
    });
};

// Update News
const update = (req, res) => {
  const { id } = req.params;
  const { title, author, category, tags, date, cover, body } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "News Id is required",
    });
  }

  News.findById(id)
    .then((news) => {
      if (!news) {
        return res.status(404).send({
          message: `News with id ${id} not found.`,
        });
      }

      news.title = title;
      news.author = author;
      news.category = category;
      news.tags = tags;
      news.date = date;
      news.cover = cover;
      news.body = body;

      news
        .save()
        .then((news) => {
          res.send({
            message: "News was updated successfully",
            timestamp: new Date().toString(),
            data: news,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            message: err.message || "Some error occurred while updating news.",
          });
        });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err.message || "Some error occurred while updating news.",
      });
    });
};

export { findAll, deleteNews, createNews, findById, update };
