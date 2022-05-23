const PGPromise = require("pg-promise");
const db = require("../");
const path = require("path");

const fileName = path.basename(__filename, ".js");
const filePath = path.join(__dirname, `${fileName}.sql`);
const queryFile = new PGPromise.QueryFile(filePath);

const run = () => db.none(queryFile);

module.exports = run;
