const db = require("../");
const destroyData = require("./00.destroy-data");
const snacks = require("./01.snacks");

const run = async () => {
  console.log("Deleting all data from database...");
  await destroyData();

  console.log("Seeding Snack data...");
  await snacks();

  db.$pool.end();
  console.log("Complete.");
};

run();
