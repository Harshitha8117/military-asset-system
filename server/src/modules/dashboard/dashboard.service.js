const db = require("../../config/db");

exports.getMetrics = async ({ base_id }) => {
  const res = await db.query(`
    SELECT 
      SUM(CASE WHEN type='PURCHASE' THEN quantity ELSE 0 END) as purchases,
      SUM(CASE WHEN type='TRANSFER_IN' THEN quantity ELSE 0 END) as transfer_in,
      SUM(CASE WHEN type='TRANSFER_OUT' THEN quantity ELSE 0 END) as transfer_out,
      SUM(CASE WHEN type='ASSIGNMENT' THEN quantity ELSE 0 END) as assigned,
      SUM(CASE WHEN type='EXPENDITURE' THEN quantity ELSE 0 END) as expended
    FROM movements
    WHERE to_base_id=$1 OR from_base_id=$1
  `, [base_id]);

  return res.rows[0];
};