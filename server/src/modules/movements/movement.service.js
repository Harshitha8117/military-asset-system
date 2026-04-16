const db = require("../../config/db");

exports.createMovement = async (data, user) => {
  const result = await db.query(
    `INSERT INTO movements 
    (type, equipment_id, quantity, from_base_id, to_base_id, assigned_to)
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [
      data.type,
      data.equipment_id,
      data.quantity,
      data.from_base_id,
      data.to_base_id,
      data.assigned_to
    ]
  );

  return result.rows[0];
};

exports.getMovements = async () => {
  const res = await db.query("SELECT * FROM movements ORDER BY created_at DESC");
  return res.rows;
};