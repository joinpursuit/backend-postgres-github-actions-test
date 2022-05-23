const db = require("../");

const run = async () => {
  await db.none(`DROP TABLE IF EXISTS reviews;`);
  await db.none(`DROP TABLE IF EXISTS snacks;`);
};

module.exports = run;
