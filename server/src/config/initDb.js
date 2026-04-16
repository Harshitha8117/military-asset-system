// src/config/initDb.js

const db = require("./db");
const bcrypt = require("bcrypt");

const init = async () => {
  try {
    // 🧱 USERS
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT,
        base_id INTEGER
      )
    `);

    // 🏢 BASES
    await db.query(`
      CREATE TABLE IF NOT EXISTS bases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      )
    `);

    // ⚙️ EQUIPMENT
    await db.query(`
      CREATE TABLE IF NOT EXISTS equipment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT
      )
    `);

    // 🔥 MOVEMENTS (CORE)
    await db.query(`
      CREATE TABLE IF NOT EXISTS movements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        equipment_id INTEGER,
        quantity INTEGER,
        from_base_id INTEGER,
        to_base_id INTEGER,
        assigned_to INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 📜 AUDIT LOGS
    await db.query(`
      CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        action TEXT,
        payload TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 🌱 SEED DATA (only if empty)
    const users = await db.query("SELECT * FROM users");

    if (users.rows.length === 0) {
      const hash = await bcrypt.hash("admin123", 10);

      await db.query(
        `INSERT INTO users (username, password, role, base_id)
         VALUES (?, ?, ?, ?)`,
        ["admin", hash, "Admin", 1]
      );

      await db.query(`INSERT INTO bases (name) VALUES (?)`, ["Base Alpha"]);
      await db.query(`INSERT INTO equipment (name) VALUES (?)`, ["Rifle"]);

      console.log("🌱 Seed data inserted");
    }

    console.log("✅ SQLite DB Initialized");
  } catch (err) {
    console.error("❌ DB Init Error:", err);
  }
};

// 🔥 IMPORTANT: export the function
module.exports = init;