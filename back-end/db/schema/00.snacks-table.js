require("dotenv").config();
const PGPromise = require("pg-promise");
const db = require("../");
const path = require("path");

const drop = () => {
  console.log("Dropping Snacks table...");
  return db.none(`DROP TABLE IF EXISTS snacks;`);
};

const create = () => {
  console.log("Creating Snacks table...");
  const fileName = path.basename(__filename, ".js");
  const filePath = path.join(__dirname, `${fileName}.sql`);
  const queryFile = new PGPromise.QueryFile(filePath);
  return db.none(queryFile);
};

const run = async () => {
  await drop();
  await create();
  console.log("Complete.");
};

module.exports = run;
