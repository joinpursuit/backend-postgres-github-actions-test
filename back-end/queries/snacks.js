const db = require("../db/index.js");

const getAllSnacks = () => {
  return db.any("SELECT * FROM snacks");
};

const getSnack = (id) => {
  return db.one("SELECT * FROM snacks WHERE id=$1", id);
};

const newSnack = (snack) => {
  const {
    name,
    image = "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image",
    fiber = 0,
    protein = 0,
    added_sugar = 0,
    is_healthy = false,
  } = snack;

  return db.one(
    "INSERT INTO snacks (name, image, fiber, protein, added_sugar, is_healthy) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, image, fiber, protein, added_sugar, is_healthy]
  );
};

const deleteSnack = (id) => {
  return db.one("DELETE FROM snacks WHERE id = $1 RETURNING *", id);
};

const updateSnack = (id, snack) => {
  return db.one(
    "UPDATE snacks SET name=$1, image=$2, fiber=$3, protein=$4,  added_sugar=$5, is_healthy=$6 where id=$7 RETURNING *",
    [
      snack.name,
      snack.image,
      snack.fiber,
      snack.protein,
      snack.added_sugar,
      snack.is_healthy,
      id,
    ]
  );
};

module.exports = {
  getAllSnacks,
  getSnack,
  newSnack,
  deleteSnack,
  updateSnack,
};
