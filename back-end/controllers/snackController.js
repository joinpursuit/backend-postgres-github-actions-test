const express = require("express");
const snacks = express.Router();
const {
  getAllSnacks,
  getSnack,
  newSnack,
  updateSnack,
  deleteSnack,
} = require("../queries/snacks");

const confirmHealth = require("../confirmHealth.js");

// INDEX
snacks.get("/", async (req, res) => {
  try {
    const allSnacks = await getAllSnacks();
    if (allSnacks.length > 0) {
      res.json({
        success: true,
        payload: allSnacks,
      });
      res.json(allSnacks);
    }
  } catch (err) {
    return err;
  }
});

// SHOW
snacks.get("/:id", async (req, res) => {
  const snack = await getSnack(req.params.id);
  if (snack.id) {
    res.json({
      success: true,
      payload: snack,
    });
  } else {
    res.status(404).json({
      success: false,
      payload: "not found",
    });
  }
});

// CREATE
snacks.post("/", async (req, res) => {
  req.body.is_healthy = confirmHealth(req.body);
  if (!req.body.image) {
    req.body.image =
      "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image";
  }
  if (!req.body.name) {
    res.status(422).json({
      success: false,
      payload: "Must include name field",
    });
  } else {
    req.body.name = req.body.name
      .split(" ")
      .map((word) =>
        word.length > 2
          ? word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
          : word
      )
      .join(" ");
    req.body.is_healthy = confirmHealth(req.body);
    const snack = await newSnack(req.body);
    res.json({
      success: !!snack.id,
      payload: snack,
    });
  }
});
// UPDATE

snacks.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBookmark = await updateSnack(id, req.body);
  res.json({
    success: !!updatedBookmark.id,
    payload: updatedBookmark,
  });
});
// DELETE
snacks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedBookmark = await deleteSnack(id);

  res.json({
    success: !!deletedBookmark.id,
    payload: deletedBookmark,
  });
});

module.exports = snacks;
