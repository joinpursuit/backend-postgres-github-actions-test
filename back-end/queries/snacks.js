const db = require("../db");

const DEFAULT_IMAGE =
  "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image";

const getAllSnacks = async () => {
  const query = await db.raw("SELECT * FROM snacks");
  return query.rows;
};

const getSnack = async (id) => {
  const query = await db.raw("SELECT * FROM snacks WHERE id=?", [id]);
  return query.rows[0];
};

const newSnack = async (snack) => {
  const {
    name,
    image = DEFAULT_IMAGE,
    fiber = 0,
    protein = 0,
    added_sugar = 0,
    is_healthy = false,
  } = snack;

  const query = await db.raw(
    "INSERT INTO snacks (name, image, fiber, protein, added_sugar, is_healthy) VALUES(:name, :image, :fiber, :protein, :added_sugar, :is_healthy) RETURNING *",
    { name, image, fiber, protein, added_sugar, is_healthy }
  );
  return query.rows[0];
};

const deleteSnack = async (id) => {
  const query = await db.raw("DELETE FROM snacks WHERE id = ? RETURNING *", [
    id,
  ]);
  return query.rows[0];
};

const updateSnack = async (id, snack) => {
  snack.image = snack.image || DEFAULT_IMAGE;

  const query = await db.raw(
    "UPDATE snacks SET name=:name, image=:image, fiber=:fiber, protein=:protein, added_sugar=:added_sugar, is_healthy=:is_healthy where id=:id RETURNING *",
    { id, ...snack }
  );
  return query.rows[0];
};

const getSnackReviews = async (id) => {
  const query = await db.raw(
    "SELECT reviews.* FROM snacks JOIN reviews ON snacks.id = reviews.snack_id WHERE snacks.id = ?",
    [id]
  );
  return query.rows;
};

module.exports = {
  getAllSnacks,
  getSnack,
  newSnack,
  deleteSnack,
  updateSnack,
  getSnackReviews,
};
