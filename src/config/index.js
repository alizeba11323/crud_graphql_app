const { config } = require("dotenv");

const { parsed } = config();

const { PORT, DB_URI, JWT_SECRET } = parsed;
module.exports = {
  PORT,
  DB_URI,
  JWT_SECRET,
};
