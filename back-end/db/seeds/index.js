const db = require("../");
const destroyData = require("./00.destroy-data");
const snacks = require("./01.snacks");

const run = async () => {
  await destroyData();
  await snacks();
  db.$pool.end();
};

run();
