const db = require("../");
const snacksTable = require("./00.snacks-table");

const run = async () => {
  await snacksTable();
  db.$pool.end();
};

run();
