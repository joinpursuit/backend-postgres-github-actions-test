// CONFIGURATION
require("dotenv").config();

// DEPENDENCIES
const app = require("./app.js");
const PORT = process.env.PORT;

// LISTEN
app.listen(PORT, () => {
  console.log(`🥤 🍿 Snackin' on port ${PORT} 🥨 🌰 `);
});
