// Load environment-specific .env file
const { NODE_ENV = "development" } = process.env;
const path = require("path");
const envFilename = NODE_ENV === "development" ? ".env" : `.env.${NODE_ENV}`;
const envPath = path.join(__dirname, "..", envFilename);
require("dotenv").config({ path: envPath });

const PGPromise = require("pg-promise")();

const { DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER } = process.env;
const connection = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      max: 30,
      ssl: {
        rejectUnauthorized: false,
      },
    }
  : {
      host: PG_HOST,
      port: PG_PORT,
      database: PG_DATABASE,
      user: PG_USER,
    };

const db = PGPromise(connection);

module.exports = db;
