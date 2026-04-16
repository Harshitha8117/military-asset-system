const db = require("./db");

const initDB = () => {
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

    // ✅ SAFE SEED
    db.get("SELECT COUNT(*) as count FROM movements", (err, row) => {
      if (err) {
        console.error("❌ Count error:", err);
        return;
      }

      if (!row || row.count === 0) {
        db.run(`
          INSERT INTO movements (type, equipment_id, quantity, to_base_id)
          VALUES 
          ('PURCHASE', 1, 100, 1),
          ('TRANSFER_OUT', 1, 50, 1),
          ('TRANSFER_IN', 1, 50, 2)
        `, (err) => {
          if (err) {
            console.error("❌ Seed error:", err);
          } else {
            console.log("🌱 Seed data inserted");
          }
        });
      } else {
        console.log("ℹ️ Data already exists");
      }
    });

    console.log("✅ SQLite DB Initialized");
  });
};

module.exports = initDB;