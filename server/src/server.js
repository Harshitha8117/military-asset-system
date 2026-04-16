// src/server.js

const initDb = require("./config/initDb");
const app = require("./app");
const { PORT } = require("./config/env");

const start = async () => {
  await initDb();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

start();