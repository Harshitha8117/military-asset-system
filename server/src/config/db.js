const Database = require("better-sqlite3");

const db = new Database("database.sqlite");

// Create tables
db.exec(`
CREATE TABLE IF NOT EXISTS movements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT,
  equipment_id INTEGER,
  quantity INTEGER,
  from_base_id INTEGER,
  to_base_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`);

console.log("✅ SQLite (better) connected");

module.exports = db;