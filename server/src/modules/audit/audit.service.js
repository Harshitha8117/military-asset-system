const db = require("../../config/db");

exports.log = async ({ user_id, action, payload }) => {
  await db.query(
    `INSERT INTO audit_logs (user_id, action, payload)
     VALUES ($1,$2,$3)`,
    [user_id, action, JSON.stringify(payload)]
  );
};