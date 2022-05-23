const db = require("../");

const dropSnacks = () => db.none(`DELETE FROM snacks;`);

const run = async () => {
  await dropSnacks();
};

module.exports = run;
