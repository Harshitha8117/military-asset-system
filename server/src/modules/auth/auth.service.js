const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/env");

exports.login = async ({ username, password }) => {
  const user = await db.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );

  if (!user.rows.length) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.rows[0].password);
  if (!valid) throw new Error("Invalid password");

  const token = jwt.sign(
    {
      id: user.rows[0].id,
      role: user.rows[0].role,
      base_id: user.rows[0].base_id
    },
    JWT_SECRET
  );

  return { token, user: user.rows[0] };
};