const pool = require("../config/db");

const getAllLeaves = async () => {
  const result = await pool.query(`
    SELECT
      la.id,
      u.name AS employee_name,
      lt.leave_name,
      la.from_date,
      la.to_date,
      la.total_days,
      la.reason,
      la.status
    FROM leave_applications la
    LEFT JOIN employee_profiles ep
      ON la.employee_id = ep.id
    LEFT JOIN users u
      ON ep.user_id = u.id
    LEFT JOIN leave_types lt
      ON la.leave_type_id = lt.id
    ORDER BY la.id DESC
  `);

  return result.rows;
};

module.exports = {
  getAllLeaves
};