import db from "../models/index.js";
const Testimoni = db.testimoni;

import dataCounter from "./function/dataCounter.function.js";

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

// Find all testimoni for admin
const findAllAdmin = async (req, res) => {
  let { active, page } = req.query;
  let condition = {};

  if (active === true) {
    condition = { status: "Active" };
  } else if (active === false) {
    condition = { status: "Inactive" };
  } else {
    condition = {};
  }

  if (page === undefined) page = 1;

  const pageLimit = 10;
  const skip = pageLimit * (page - 1);
  const dataCount = await dataCounter(Testimoni, pageLimit, condition);

  const nextPage = parseInt(page) + 1;
  const prevPage = parseInt(page) - 1;

  const protocol = req.protocol === "https" ? req.protocol : "https";
  const link = `${protocol}://${req.get("host")}${req.baseUrl}`;
  var nextLink =
    nextPage > dataCount.pageCount
      ? `${link}?page=${dataCount.pageCount}`
      : `${link}?page=${nextPage}`;
  var prevLink = page > 1 ? `${link}?page=${prevPage}` : null;
  var lastLink = `${link}?page=${dataCount.pageCount}`;
  var firstLink = `${link}?page=1`;

  const pageData = {
    currentPage: parseInt(page),
    pageCount: dataCount.pageCount,
    dataPerPage: parseInt(pageLimit),
    dataCount: dataCount.dataCount,
    links: {
      next: nextLink,
      prev: prevLink,
      last: lastLink,
      first: firstLink,
    },
  };

  await Testimoni.find(condition)
    .skip(skip)
    .limit(pageLimit)
    .sort({ createdAt: -1 })
    .then((result) => {
      if (!result || result.length === 0) {
        return res.status(404).send({
          message: "Testimoni not found",
        });
      }

      const data = result.map((item) => {
        const { _id, name, position, company, testimoni, photosUrl, status } =
          item;
        return {
          id: _id,
          name,
          position,
          company,
          testimoni,
          photosUrl,
          status,
        };
      });

      res.send({
        message: "Testimoni was successfully retrieved",
        data,
        page: pageData,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving testimoni.",
      });
    });
};

// Find All testimoni for public (Done)
const findAll = (req, res) => {
  Testimoni.find({ status: "Active" })
    .then((result) => {
      if (!result || result.length === 0) {
        return res.status(404).send({
          message: "Testimoni not found",
        });
      }

      const data = result.map((item) => {
        const { name, position, company, testimoni, photosUrl } = item;
        return {
          name,
          position,
          company,
          testimoni,
          photosUrl,
        };
      });

      res.send({
        message: "Testimoni was successfully retrieved",
        data,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while retrieving testimoni.",
      });
    });
};

// Find a single testimoni with an id (Done)
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Testimoni ID is required",
    });
  }

  Testimoni.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Testimoni not found",
        });
      }

      const { _id, name, position, company, testimoni, photosUrl, status } =
        result;

      res.send({
        message: "Testimoni was successfully retrieved",
        data: {
          id: _id,
          name,
          position,
          company,
          testimoni,
          photosUrl,
          status,
        },
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while showing testimoni.",
      });
    });
};

// Create and Save a new testimoni (Done)
const create = (req, res) => {
  const { name, position, company, testimoni } = req.body;

  if (!name || !position || !company || !testimoni) {
    return res.status(400).send({
      message: "Name, Position, Company, and Testimoni are required",
    });
  }

  if (!req.file) {
    return res.status(400).send({
      message: "Photos are required",
    });
  }

  const protocol = req.protocol === "https" ? req.protocol : "https";
  const imageName = req.file.filename;
  const photosUrl = `${protocol}://${req.get(
    "host"
  )}/assets/images/${imageName}`;

  const newTestimoni = new Testimoni({
    name,
    position,
    company,
    testimoni,
    photosUrl,
  });

  newTestimoni
    .save()
    .then((result) => {
      res.send({
        message: "Testimoni was successfully created",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while creating testimoni.",
      });
    });
};

// Delete a testimoni with the specified id in the request (Done)
const deleteTesti = (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Testimoni ID is required",
    });
  }

  Testimoni.findByIdAndRemove(id)
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Testimoni not found",
        });
      }

      res.send({
        message: "Testimoni was deleted",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while delete testimoni.",
      });
    });
};

// Update a testimoni by the id in the request (Done)
const update = (req, res) => {
  const id = req.params.id;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Testimoni ID is required",
    });
  }

  const { name, position, company, testimoni } = req.body;

  const data = {
    name,
    position,
    company,
    testimoni,
  };

  Testimoni.findByIdAndUpdate(id, data, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Testimoni not found",
        });
      }

      res.send({
        message: "Testimoni was updated",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while update testimoni.",
      });
    });
};

// Deactivate a testimoni by the id in the request (Done)
const deactivate = (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Testimoni ID is required",
    });
  }

  Testimoni.findByIdAndUpdate(id, { status: "Inactive" }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Testimoni not found",
        });
      }

      res.send({
        message: "Testimoni was deactivated",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while deactivate testimoni.",
      });
    });
};

// Upload photos testimoni (Done)
const uploadPhotos = (req, res) => {
  const { id } = req.params;

  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "Testimoni ID is required",
    });
  }

  const protocol = req.protocol === "https" ? req.protocol : "https";
  const imageName = req.file.filename;
  const photosUrl = `${protocol}://${req.get(
    "host"
  )}/assets/images/${imageName}`;

  Testimoni.findByIdAndUpdate(id, { photosUrl }, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Testimoni not found",
        });
      }

      res.send({
        message: "Testimoni photo was successfully uploaded",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while uploading testimoni.",
      });
    });
};

export {
  findAllAdmin,
  findAll,
  findOne,
  create,
  deleteTesti,
  update,
  deactivate,
  uploadPhotos,
};
