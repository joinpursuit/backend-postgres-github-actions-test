const db = require("../");
const queryFile = require("../helpers/getSQLFile")(__filename, __dirname);

const drop = () => db.none(`DROP TABLE IF EXISTS snacks;`);

const create = () => db.none(queryFile);

const run = async () => {
  await drop();
  await create();
};

module.exports = run;
