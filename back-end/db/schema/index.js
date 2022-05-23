const db = require("../");
const snacksTable = require("./00.snacks-table");

const run = async () => {
  console.log("Resetting Snacks table...");
  await snacksTable();

  db.$pool.end();
  console.log("Complete.");
};

run();
