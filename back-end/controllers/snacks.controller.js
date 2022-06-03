const express = require("express");
const snacks = express.Router();
const {
  getAllSnacks,
  getSnack,
  newSnack,
  updateSnack,
  deleteSnack,
  getSnackReviews,
} = require("../models/snack.model");

const isHealthy = require("./util/isHealthy.js");
const formatName = require("./util/formatName.js");

// INDEX
snacks.get("/", async (_req, res, next) => {
  try {
    const snacks = await getAllSnacks();
    res.json({ status: "success", data: { snacks } });
  } catch (error) {
    next(error);
  }
});

// SHOW
snacks.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const snack = await getSnack(id);
    if (!snack) {
      return next({
        status: 404,
        message: `No resource found with ID of '${id}'`,
      });
    }

    res.json({ status: "success", data: { snack } });
  } catch (error) {
    return next(error);
  }
});

// SHOW ASSOCIATED REVIEWS
snacks.get("/:id/reviews", async (req, res, next) => {
  const { id } = req.params;
  try {
    const snack = await getSnack(id);
    if (!snack) {
      return next({
        status: 404,
        message: `No resource found with ID of '${id}'`,
      });
    }

    snack.reviews = await getSnackReviews(id);
    res.json({ status: "success", data: { snack } });
  } catch (error) {
    next(error);
  }
});

// CREATE
snacks.post("/", async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    const message = `Resource must include the 'name' field`;
    return next({ status: 422, message });
  }

  try {
    req.body.is_healthy = isHealthy(req.body);
    req.body.name = formatName(name);

    const snack = await newSnack(req.body);
    res.json({ status: "success", data: { snack } });
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
    return next({ status: 422, message });
  }

  try {
    req.body.is_healthy = isHealthy(req.body);
    req.body.name = formatName(name);

    const snack = await updateSnack(id, req.body);
    if (!snack) {
      return next({
        status: 404,
        message: `No resource found with ID of '${id}'`,
      });
    }

    res.json({ status: "success", data: { snack } });
  } catch (error) {
    next(error);
  }
});

// DELETE
snacks.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const snack = await deleteSnack(id);
    if (!snack) {
      return next({
        status: 404,
        message: `No resource found with ID of '${id}'`,
      });
    }

    res.json({ status: "success", data: null });
  } catch (error) {
    next(error);
  }
});

module.exports = snacks;
