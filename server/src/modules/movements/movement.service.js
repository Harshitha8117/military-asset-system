const db = require("../../config/db");

exports.getMovements = async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM movements ORDER BY id DESC", [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};