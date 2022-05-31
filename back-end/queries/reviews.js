const db = require("../db");

const getAllReviews = async () => {
  const query = await db.raw("SELECT * FROM reviews");
  return query.rows;
};

const getReview = async (id) => {
  const query = await db.raw("SELECT * FROM reviews WHERE id=?", [id]);
  return query.rows[0];
};

const newReview = async (review) => {
  const query = await db.raw(
    "INSERT INTO reviews (reviewer_name, content, rating, snack_id) VALUES(:reviewer_name, :content, :rating, :snack_id) RETURNING *",
    review
  );
  return query.rows[0];
};

const deleteReview = async (id) => {
  const query = await db.raw("DELETE FROM reviews WHERE id = ? RETURNING *", [
    id,
  ]);
  return query.rows[0];
};

const updateReview = async (id, review) => {
  const query = await db.raw(
    "UPDATE reviews SET reviewer_name = :reviewer_name, content = :content, rating = :rating, snack_id = :snack_id WHERE id = :id RETURNING *",
    { id, ...review }
  );
  return query.rows[0];
};

module.exports = {
  getAllReviews,
  getReview,
  newReview,
  deleteReview,
  updateReview,
};
