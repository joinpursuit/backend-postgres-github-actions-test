const express = require("express");
const reviews = express.Router();
const {
  getAllReviews,
  getReview,
  newReview,
  updateReview,
  deleteReview,
} = require("../queries/reviews");

// INDEX
reviews.get("/", async (_req, res, next) => {
  try {
    const payload = await getAllReviews();
    res.json({ success: true, payload });
  } catch (error) {
    next(error);
  }
});

// SHOW
reviews.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const payload = await getReview(id);
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
reviews.post("/", async (req, res, next) => {
  const { rating, reviewer_name } = req.body;
  if (!rating || rating < 0 || rating > 5) {
    const message = `Resource must include the 'rating' field and it must be a value between 0 and 5.`;
    next({ status: 422, message });
  }

  if (!reviewer_name) req.body.reviewer_name = "Anonymous";

  try {
    const payload = await newReview(req.body);
    res.json({ success: true, payload });
  } catch (error) {
    next(error);
  }
});

// UPDATE
reviews.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { rating, reviewer_name } = req.body;

  if (!rating || rating < 0 || rating > 5) {
    const message = `Resource must include the 'rating' field and it must be a value between 0 and 5.`;
    next({ status: 422, message });
  }

  if (!reviewer_name) req.body.reviewer_name = "Anonymous";

  try {
    const payload = await updateReview(id, req.body);
    res.json({
      success: true,
      payload,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE
reviews.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const payload = await deleteReview(id);
    res.json({ success: true, payload });
  } catch (error) {
    next(error);
  }
});

module.exports = reviews;
