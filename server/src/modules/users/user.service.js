const db = require("../../config/db");

exports.getUsers = async () => {
  const res = await db.query("SELECT * FROM users");
  return res.rows;
};