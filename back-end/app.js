// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.get("/", (req, res) => {
  res
    .status(200)
    .send("Get Snack'n at Snack-a-log!");
});

const snacksController = require("./controllers/snackController.js");
app.use("/snacks", snacksController);

// 404 PAGE
app.get("*", (req, res) => {
  res.status(404).send("No snacks here! <a href='/snacks'>Go back!</a>");
});

// EXPORT
module.exports = app;
