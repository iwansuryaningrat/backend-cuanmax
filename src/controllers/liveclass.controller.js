import db from "../models/index.js";
const Liveclass = db.liveclass;

import dataCounter from "./function/dataCounter.function.js";

// Find all liveclasses (Done)
const findAll = (req, res) => {
  const { status, category, tags, page } = req.query;
  const query = status ? { status: status } : {};

  if (category) {
    query.category = category;
  }

  if (tags) {
    query.tags = { $in: tags.split(",") };
  }

  if (page === null) page = 1;

  const pageLimit = 10;
  const skip = page ? (page - 1) * pageLimit : 0;
  const dataCount = dataCounter(Liveclass, pageLimit, query);
  const pageData = {
    currentPage: page,
    pageCount: dataCount.pageCount,
    dataPerPage: pageLimit,
    dataCount: dataCount.dataCount,
  };

  Liveclass.find(query)
    .populate({
      path: "participants.participantsList.userID",
      select: "name username email",
    })
    .skip(skip)
    .limit(pageLimit)
    .sort({ createdAt: -1 })
    .then((liveclasses) => {
      if (!liveclasses) {
        return res.status(404).send({
          message: "No liveclass was found",
        });
      }

      res.send({
        message: "All liveclasses were fetched successfully",
        data: liveclasses,
        page: pageData,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving liveclasses.",
      });
    });
};

// Find All liveclasses for Users (Done)
const findAllForUsers = (req, res) => {
  const { page, pageLimit } = req.query;

  if (page === null) page = 1;
  if (pageLimit === null) pageLimit = 9;

  const skip = page ? (page - 1) * pageLimit : 0;
  const dataCount = dataCounter(Liveclass, pageLimit);
  const pageData = {
    currentPage: page,
    pageCount: dataCount.pageCount,
    dataPerPage: pageLimit,
    dataCount: dataCount.dataCount,
  };

  Liveclass.find({
    status: {
      $in: ["Upcoming", "Closed", "Ongoing"],
    },
  })
    .skip(skip)
    .limit(pageLimit)
    .sort({ createdAt: -1 })
    .then((liveclasses) => {
      if (!liveclasses) {
        return res.status(404).send({
          message: "No liveclass was found",
        });
      }

      const data = liveclasses.map((liveclass) => {
        const {
          _id,
          title,
          price,
          description,
          category,
          tags,
          date,
          time,
          location,
          benefits,
          thumbnail,
        } = liveclass;
        return {
          id: _id,
          title,
          price,
          description,
          category,
          tags,
          date,
          time,
          location,
          benefits,
          thumbnail,
        };
      });

      res.send({
        message: "All liveclasses were fetched successfully",
        data,
        page: pageData,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving liveclasses.",
      });
    });
};

// Find liveclass by id (Done)
const findOne = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Live class Id is required",
    });
  }

  Liveclass.findById(id)
    .populate({
      path: "participants.participantsList.userID",
      select: "name username email",
    })
    .then((liveclass) => {
      if (!liveclass) {
        return res.status(404).send({
          message: "Liveclass not found with id " + id,
        });
      }
      res.send({
        message: "Liveclass was fetched successfully",
        data: liveclass,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Error while retrieving liveclass",
      });
    });
};

// Delete liveclass (Done)
const deleteClass = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Live class Id is required",
    });
  }

  Liveclass.findByIdAndRemove(id)
    .then((liveclass) => {
      if (!liveclass) {
        return res.status(404).send({
          message: "Liveclass not found with id " + id,
        });
      }
      res.send({
        message: "Liveclass was deleted successfully",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Error while deleting liveclass",
      });
    });
};

// Done
const update = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Live Class ID is required.",
    });
  }

  Liveclass.findByIdAndupdate(id, req.body, { new: true })
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Live Class not found",
        });
      }

      res.send({
        message: "Live Class was updated",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while updating live class.",
      });
    });
};

// Create liveclass (Done)
const create = (req, res) => {
  const {
    title,
    liveclassCode,
    price,
    category,
    description,
    tags,
    date,
    time,
    location,
    status,
    benefits,
  } = req.body;

  if (!title || !liveclassCode || !price || !date || !time || !location) {
    return res.status(400).send({
      message:
        "Title, Live Class Code, Price, Date, Time, and Location are required.",
    });
  }

  const photoName = req.file.filename;
  const photoLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/images/${photoName}`;

  if (!req.file) {
    return res.status(400).send({
      message: "Thumbnail is required.",
    });
  }

  const liveclass = new Liveclass({
    title: title,
    liveclassCode: liveclassCode,
    price: price,
    category: category,
    description: description,
    tags: tags,
    date: date,
    time: time,
    location: location,
    thumbnail: {
      imageName: photoName,
      imageLink: photoLink,
    },
    benefits: benefits,
    participants: [],
    status: status,
  });

  liveclass
    .save()
    .then((result) => {
      res.send({
        message: "Live Class was created",
        data: result,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating Live Class.",
      });
    });
};

// Need Testing
const updateThumbnail = (req, res) => {
  const photoName = req.file.filename;
  const photoLink = `${req.protocol}://${req.get(
    "host"
  )}/assets/images/${photoName}`;

  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Live Class ID is required.",
    });
  }

  Liveclass.findByIdAndUpdate(
    id,
    { thumbnail: { imageName: photoName, imageLink: photoLink } },
    { new: true }
  )
    .then((result) => {
      if (!result) {
        return res.status(404).send({
          message: "Live Class not found",
        });
      }

      return res.status(200).send({
        message: "Live Class was updated",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error while updating live class.",
      });
    });
};

export {
  findAll,
  findAllForUsers,
  findOne,
  deleteClass,
  update,
  create,
  updateThumbnail,
};
