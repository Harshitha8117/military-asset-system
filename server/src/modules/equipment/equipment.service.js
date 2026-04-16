const db = require("../../config/db");

exports.getEquipment = async () => {
  const res = await db.query("SELECT * FROM equipment");
  return res.rows;
};