const express = require("express");
const snacks = express.Router();
const {
  getAllSnacks,
  getSnack,
  newSnack,
  updateSnack,
  deleteSnack,
} = require("../queries/snacks");

const isHealthy = require("./util/isHealthy.js");
const formatName = require("./util/formatName.js");

// INDEX
snacks.get("/", async (_req, res, next) => {
  try {
    const payload = await getAllSnacks();
    res.json({ success: true, payload });
  } catch (error) {
    next(error);
  }
});

// SHOW
snacks.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const payload = await getSnack(id);
    res.json({ success: true, payload });
  } catch (error) {
    if (error.name === "QueryResultError") {
      const message = `No resource found with ID of '${id}'`;
      return next({ status: 404, message });
    }

    next(error);
  }
});

// CREATE
snacks.post("/", async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    const message = `Resource must include the 'name' field`;
    next({ status: 422, message });
  }

  try {
    req.body.is_healthy = isHealthy(req.body);
    req.body.name = formatName(name);

    const payload = await newSnack(req.body);
    res.json({ success: true, payload });
  } catch (error) {
    next(error);
  }
});

// UPDATE
snacks.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    const message = `Resource must include the 'name' field`;
    next({ status: 422, message });
  }

  try {
    req.body.is_healthy = isHealthy(req.body);
    req.body.name = formatName(name);

    const payload = await updateSnack(id, req.body);
    res.json({
      success: true,
      payload,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE
snacks.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const payload = await deleteSnack(id);
    res.json({ success: true, payload });
  } catch (error) {
    next(error);
  }
});

module.exports = snacks;
