const db = require("../");
const destroyData = require("./00.destroy-data");
const snacks = require("./01.snacks");
const reviews = require("./02.reviews");

const run = async () => {
  console.log("Deleting all data from database...");
  await destroyData();

  console.log("Seeding Snack data...");
  await snacks();

  console.log("Seeding Review data...");
  await reviews();

  db.$pool.end();
  console.log("Complete.");
};

run();
