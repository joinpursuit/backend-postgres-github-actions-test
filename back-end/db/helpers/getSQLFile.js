const PGPromise = require("pg-promise");
const path = require("path");

function getSQLFile(externalFileName, externalDirectoryName) {
  const fileName = path.basename(externalFileName, ".js");
  const filePath = path.join(externalDirectoryName, `${fileName}.sql`);
  const queryFile = new PGPromise.QueryFile(filePath);

  return queryFile;
}

module.exports = getSQLFile;
