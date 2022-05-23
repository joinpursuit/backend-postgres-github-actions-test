const db = require("..");
const queryFile = require("../helpers/getSQLFile")(__filename, __dirname);

const run = () => db.none(queryFile);

module.exports = run;
