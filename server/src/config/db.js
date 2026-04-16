// src/config/db.js

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Use safe path (works locally + on Render)
const dbPath = path.join(__dirname, "../../database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ DB Connection Error:", err);
  } else {
    console.log("✅ SQLite DB Initialized");
  }
});

// 🔥 Create table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      equipment_id INTEGER,
      quantity INTEGER,
      from_base_id INTEGER,
      to_base_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;