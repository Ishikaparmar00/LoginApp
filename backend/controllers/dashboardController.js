const db = require("../config/db");

const getDashboardStats = async (req, res) => {
  try {

    const totalEmployees = await db.query(
      "SELECT COUNT(*) FROM employee_profiles"
    );

    const totalLeaves = await db.query(
      "SELECT COUNT(*) FROM leave_applications"
    );

    const pendingLeaves = await db.query(
      "SELECT COUNT(*) FROM leave_applications WHERE status = 'Pending'"
    );

    const approvedLeaves = await db.query(
      "SELECT COUNT(*) FROM leave_applications WHERE status = 'Approved'"
    );

    const rejectedLeaves = await db.query(
      "SELECT COUNT(*) FROM leave_applications WHERE status = 'Rejected'"
    );

    res.status(200).json({
      totalEmployees: Number(totalEmployees.rows[0].count),
      totalLeaves: Number(totalLeaves.rows[0].count),
      pendingLeaves: Number(pendingLeaves.rows[0].count),
      approvedLeaves: Number(approvedLeaves.rows[0].count),
      rejectedLeaves: Number(rejectedLeaves.rows[0].count)
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getDashboardStats
};