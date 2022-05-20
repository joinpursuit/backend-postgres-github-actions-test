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
  res.status(200).send("Get Snack'n at Snack-a-log!");
});

const snacksController = require("./controllers/snackController.js");
app.use("/snacks", snacksController);

// PAGE NOT FOUND
app.use((req, _res, next) => {
  next({
    status: 404,
    message: `${req.method} ${req.path} not found.`,
  });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  const { status = 500, message = "Something went wrong." } = err;
  res.status(status).json({
    success: false,
    payload: message,
  });
});

// EXPORT
module.exports = app;
