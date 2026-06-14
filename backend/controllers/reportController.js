const db = require("../config/db");

const getLeaveReport = async (req, res) => {
  try {
    console.log("Leave Report API Hit");

    const result = await db.query(
      "SELECT * FROM leave_applications"
    );

    console.log(result.rows);

    res.status(200).json(result.rows);

  } catch (error) {
    console.error("FULL ERROR =>", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getLeaveReport
};