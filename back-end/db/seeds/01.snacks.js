require("dotenv").config();
const PGPromise = require("pg-promise");
const db = require("../");
const path = require("path");

const run = async () => {
  console.log("Seeding snacks...");
  const fileName = path.basename(__filename, ".js");
  const filePath = path.join(__dirname, `${fileName}.sql`);
  const queryFile = new PGPromise.QueryFile(filePath);

  await db.none(queryFile);
  console.log("Complete.");
};

module.exports = run;
