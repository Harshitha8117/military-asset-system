const db = require("../../config/db");

exports.createMovement = (data) => {
  const stmt = db.prepare(`
    INSERT INTO movements 
    (type, equipment_id, quantity, from_base_id, to_base_id)
    VALUES (?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    data.type,
    data.equipment_id,
    data.quantity,
    data.from_base_id || null,
    data.to_base_id || null
  );

  return { id: result.lastInsertRowid };
};


exports.getMovements = () => {
  return db.prepare("SELECT * FROM movements ORDER BY created_at DESC").all();
};