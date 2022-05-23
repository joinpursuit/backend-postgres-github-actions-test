const db = require("../db/index.js");

const getAllReviews = () => {
  return db.any("SELECT * FROM reviews");
};

const getReview = (id) => {
  return db.one("SELECT * FROM reviews WHERE id=$1", id);
};

const newReview = (review) => {
  const { reviewer_name, content, rating, snack_id } = review;

  return db.one(
    "INSERT INTO reviews (reviewer_name, content, rating, snack_id) VALUES($1, $2, $3, $4) RETURNING *",
    [reviewer_name, content, rating, snack_id]
  );
};

const deleteReview = (id) => {
  return db.one("DELETE FROM reviews WHERE id = $1 RETURNING *", id);
};

const updateReview = (id, review) => {
  const { reviewer_name, content, rating, snack_id } = review;

  return db.one(
    "UPDATE reviews SET reviewer_name=$1, content=$2, rating=$3, snack_id=$4 WHERE id=$5 RETURNING *",
    [reviewer_name, content, rating, snack_id, id]
  );
};

module.exports = {
  getAllReviews,
  getReview,
  newReview,
  deleteReview,
  updateReview,
};
