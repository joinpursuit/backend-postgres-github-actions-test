const express = require("express");
const reviews = express.Router();
const {
  getAllReviews,
  getReview,
  newReview,
  updateReview,
  deleteReview,
} = require("../models/review.model");
const { getSnack } = require("../models/snack.model");

// INDEX
reviews.get("/", async (_req, res, next) => {
  try {
    const reviews = await getAllReviews();
    res.json({ status: "success", data: { reviews } });
  } catch (error) {
    next(error);
  }
});

// SHOW
reviews.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await getReview(id);
    if (!review) {
      return next({
        status: 404,
        message: `No resource found with ID of '${id}'`,
      });
    }

    res.json({ status: "success", data: { review } });
  } catch (error) {
    return next(error);
  }
});

// CREATE
reviews.post("/", async (req, res, next) => {
  const { rating, reviewer_name, snack_id } = req.body;
  if (!rating || rating < 0 || rating > 5) {
    const message = `Resource must include the 'rating' field and it must be a value between 0 and 5.`;
    return next({ status: 422, message });
  }

  if (!reviewer_name) req.body.reviewer_name = "Anonymous";

  if (!snack_id) {
    const message = `A valid 'snack_id' is required.`;
    return next({ status: 422, message });
  }

  const snack = await getSnack(snack_id);
  if (!snack) {
    return next({
      status: 404,
      message: `No resource found with ID of '${snack_id}'`,
    });
  }

  try {
    const review = await newReview(req.body);
    res.json({ status: "success", data: { review } });
  } catch (error) {
    next(error);
  }
});

// UPDATE
reviews.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rating, reviewer_name, snack_id } = req.body;

  if (!rating || rating < 0 || rating > 5) {
    const message = `Resource must include the 'rating' field and it must be a value between 0 and 5.`;
    return next({ status: 422, message });
  }

  if (!reviewer_name) req.body.reviewer_name = "Anonymous";

  if (!snack_id) {
    const message = `A valid 'snack_id' is required.`;
    return next({ status: 422, message });
  }

  const snack = await getSnack(snack_id);
  if (!snack) {
    return next({
      status: 404,
      message: `No resource found with ID of '${snack_id}'`,
    });
  }

  try {
    const review = await updateReview(id, req.body);
    if (!review) {
      return next({
        status: 404,
        message: `No resource found with ID of '${id}'`,
      });
    }

    res.json({ status: "success", data: { review } });
  } catch (error) {
    next(error);
  }
});

// DELETE
reviews.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const review = await deleteReview(id);
    if (!review) {
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

module.exports = reviews;
