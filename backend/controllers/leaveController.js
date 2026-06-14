const leaveService = require("../services/leaveService");
const pool = require("../config/db");
const applyLeave = async (req, res) => {
  const client = await pool.connect();
  try {
    const {
      employee_id,
      leave_type_id,
      from_date,
      to_date,
      reason
    } = req.body;

    const total_days =
      Math.ceil(
        (new Date(to_date) - new Date(from_date)) /
        (1000 * 60 * 60 * 24)
      ) + 1;

    const result = await pool.query(
      `INSERT INTO leave_applications
      (employee_id, leave_type_id, from_date, to_date, total_days, reason, status)
      VALUES ($1,$2,$3,$4,$5,$6,'Pending')
      RETURNING *`,
      [
        employee_id,
        leave_type_id,
        from_date,
        to_date,
        total_days,
        reason
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};
const getLeaves = async (req, res) => {
  try {

    const leaves =
      await leaveService.getAllLeaves();

    res.json(leaves);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};
const approveLeave = async (req, res) => {
  console.log("APPLY LEAVE API HIT");
  console.log(req.body);
  const { id } = req.params;
  const { approved_by, action, remarks } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Fetch Leave Details
    const leaveResult = await client.query(
      `SELECT employee_id,
              leave_type_id,
              total_days
       FROM leave_applications
       WHERE id = $1`,
      [id]
    );

    if (leaveResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        success: false,
        message: "Leave Request Not Found",
      });
    }

    const leave = leaveResult.rows[0];

    console.log("========== LEAVE DATA ==========");
    console.log("Employee ID:", leave.employee_id);
    console.log("Leave Type ID:", leave.leave_type_id);
    console.log("Total Days:", leave.total_days);

    // Update Leave Status
    await client.query(
      `UPDATE leave_applications
       SET status = $1
       WHERE id = $2`,
      [action, id]
    );

    // Deduct Leave Balance
    if (action === "Approved") {
      const balanceCheck = await client.query(
        `SELECT *
         FROM leave_balance
         WHERE employee_id = $1
         AND leave_type_id = $2`,
        [leave.employee_id, leave.leave_type_id]
      );

      console.log("Balance Record Found:");
      console.log(balanceCheck.rows);

      const updateResult = await client.query(
        `UPDATE leave_balance
         SET available_days = available_days - $1
         WHERE employee_id = $2
         AND leave_type_id = $3`,
        [
          leave.total_days,
          leave.employee_id,
          leave.leave_type_id,
        ]
      );

      console.log("Rows Updated:", updateResult.rowCount);

      await client.query(
  `INSERT INTO notifications
   (user_id, title, message)
   VALUES ($1, $2, $3)`,
  [
    leave.employee_id,
    "Leave Approved",
    "Your leave request has been approved"
  ]
);
await client.query(
  `INSERT INTO audit_logs
   (user_id, action, module_name, record_id)
   VALUES ($1,$2,$3,$4)`,
  [
    approved_by,
    action,
    "Leave Management",
    id
  ]
);
    }

    // Save Approval History
    await client.query(
      `INSERT INTO approval_history
       (leave_id, approved_by, action, remarks)
       VALUES ($1, $2, $3, $4)`,
      [id, approved_by, action, remarks]
    );

    await client.query("COMMIT");

    res.json({
      success: true,
      message: `Leave ${action} Successfully`,
    });

  } catch (error) {
    await client.query("ROLLBACK");

    console.error("FULL ERROR =>", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  } finally {
    client.release();
  }
};
const getLeaveBalance = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const result = await pool.query(
      `
      SELECT
        lb.id,
        lt.leave_name,
        lb.available_days
      FROM leave_balance lb
      JOIN leave_types lt
        ON lb.leave_type_id = lt.id
      WHERE lb.employee_id = $1
      `,
      [employeeId]
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};
const getLeaveAssessment = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        u.name AS employee_name,
        COUNT(la.id) AS total_leaves,
        SUM(CASE WHEN la.status='Approved' THEN 1 ELSE 0 END) AS approved,
        SUM(CASE WHEN la.status='Rejected' THEN 1 ELSE 0 END) AS rejected,
        SUM(CASE WHEN la.status='Pending' THEN 1 ELSE 0 END) AS pending
      FROM leave_applications la
      JOIN employee_profiles ep
        ON la.employee_id = ep.id
      JOIN users u
        ON ep.user_id = u.id
      GROUP BY u.name
      ORDER BY total_leaves DESC
    `);

    res.json(result.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};
const getDashboardStats = async (req, res) => {
  try {
    const total = await pool.query(
      "SELECT COUNT(*) FROM leave_applications"
    );

    const approved = await pool.query(
      "SELECT COUNT(*) FROM leave_applications WHERE status='Approved'"
    );

    const pending = await pool.query(
      "SELECT COUNT(*) FROM leave_applications WHERE status='Pending'"
    );

    const rejected = await pool.query(
      "SELECT COUNT(*) FROM leave_applications WHERE status='Rejected'"
    );

    res.json({
      total: total.rows[0].count,
      approved: approved.rows[0].count,
      pending: pending.rows[0].count,
      rejected: rejected.rows[0].count,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
module.exports = {
  applyLeave,
  getLeaves,
  approveLeave,
  getDashboardStats,
  getLeaveBalance,
  getLeaveAssessment
};