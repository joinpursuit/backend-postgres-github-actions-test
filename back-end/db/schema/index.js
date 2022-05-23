const db = require("../");
const dropTables = require("./00.drop");
const snacksTable = require("./01.snacks");
const reviewsTable = require("./02.reviews");

const run = async () => {
  console.log("Dropping all tables...");
  await dropTables();

  console.log("Creating Snacks table...");
  await snacksTable();

  console.log("Creating Reviews table...");
  await reviewsTable();

  db.$pool.end();
  console.log("Complete.");
};

run();
