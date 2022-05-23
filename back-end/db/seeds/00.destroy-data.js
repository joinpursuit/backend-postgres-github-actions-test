require("dotenv").config();
const db = require("../");

const dropSnacks = () => {
  return db.none(`DELETE FROM snacks;`);
};

const run = async () => {
  await dropSnacks();
};

module.exports = run;
