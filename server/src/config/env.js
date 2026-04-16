require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET || "secret123"
};