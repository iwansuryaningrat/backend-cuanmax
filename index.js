// Express REST server
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
// Load .env file
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// MongoDB Connection

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Cuanmax REST API",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port http//localhost:${process.env.PORT}`);
});
