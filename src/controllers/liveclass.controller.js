import db from "../models/index.js";
const Liveclass = db.liveclass;

import dataCounter from "./function/dataCounter.function.js";

// Find all liveclasses (Done)
const findAll = async (req, res) => {
  let { status, category, tags, page } = req.query;
  let query = status ? { status: status } : {};

  if (category) {
    query.category = category;
  }

  if (tags) {
    query.tags = { $in: tags.split(",") };
  }

  if (page === undefined) page = 1;

  const pageLimit = 10;
  const skip = page ? (page - 1) * pageLimit : 0;
  const dataCount = await dataCounter(Liveclass, pageLimit, query);

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

  await Liveclass.find(query)
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

      const data = liveclasses.map((liveclass) => {
        const {
          _id,
          title,
          liveclassCode,
          price,
          discount,
          totalPrice,
          description,
          category,
          tags,
          date,
          time,
          location,
          benefits,
          thumbnail,
          participants,
          status,
        } = liveclass;
        return {
          id: _id,
          title,
          liveclassCode,
          price,
          discount,
          totalPrice,
          description,
          category,
          tags,
          date,
          time,
          location,
          thumbnail,
          benefits,
          participants,
          status,
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

// Find All liveclasses for Users (Done)
const findAllForUsers = async (req, res) => {
  let { page, pageLimit } = req.query;

  if (page === undefined) page = 1;
  if (pageLimit === undefined) pageLimit = 9;

  const condition = {
    status: {
      $in: ["Upcoming", "Closed", "Ongoing"],
    },
  };

  const skip = page ? (page - 1) * pageLimit : 0;
  const dataCount = await dataCounter(Liveclass, pageLimit, condition);

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

  await Liveclass.find()
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
          liveclassCode,
          price,
          discount,
          totalPrice,
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
          liveclassCode,
          price,
          discount,
          totalPrice,
          description,
          category,
          tags,
          date,
          time,
          location,
          thumbnail,
          benefits,
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
        message: "Some error occurred while retrieving liveclasses.",
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
    discount,
    totalPrice,
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

  if (!req.file) {
    return res.status(400).send({
      message: "Thumbnail is required.",
    });
  }

  const protocol = req.protocol === "https" ? req.protocol : "https";
  const photoName = req.file.filename;
  const photoLink = `${protocol}://${req.get(
    "host"
  )}/assets/images/${photoName}`;

  const theDate = new Date(date).toDateString();

  const liveclass = new Liveclass({
    title,
    liveclassCode,
    price,
    discount,
    totalPrice,
    category,
    description,
    tags,
    theDate,
    time,
    location,
    thumbnail: {
      imageName: photoName,
      imageLink: photoLink,
    },
    benefits,
    participants: [],
    status,
  });

  liveclass
    .save()
    .then((result) => {
      res.send({
        message: "Live class was successfully created",
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while creating Live Class.",
      });
    });
};

// Update thumbnail (Done)
const updateThumbnail = (req, res) => {
  const protocol = req.protocol === "https" ? req.protocol : "https";
  const photoName = req.file.filename;
  const photoLink = `${protocol}://${req.get(
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

// Change status (Done)
const changeStatus = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: "Live Class ID is required.",
    });
  }

  const { status } = req.body;

  if (!status) {
    return res.status(400).send({
      message: "Status is required.",
    });
  }

  Liveclass.findByIdAndUpdate(
    id,
    {
      status,
    },
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
  changeStatus,
};
