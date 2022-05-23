const db = require("../");

const run = () => db.none(`DELETE FROM snacks;`);

module.exports = run;
