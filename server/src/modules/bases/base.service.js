const db = require("../../config/db");

exports.getBases = async () => {
  const res = await db.query("SELECT * FROM bases");
  return res.rows;
};