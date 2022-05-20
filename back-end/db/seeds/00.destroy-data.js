require("dotenv").config();
const db = require("../");

const dropSnacks = () => {
  console.log("Dropping Snacks table...");
  return db.none(`DELETE FROM snacks;`);
};

const run = async () => {
  await dropSnacks();
  console.log("Complete.");
};

module.exports = run;
