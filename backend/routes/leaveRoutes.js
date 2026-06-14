const express = require("express");
const router = express.Router();

const {
  applyLeave,
  getLeaves,
  approveLeave,
  getDashboardStats,
  getLeaveBalance,
  getLeaveAssessment,
  
} = require("../controllers/leaveController");

router.post("/", applyLeave);
router.get("/", getLeaves);
router.put("/:id/approve", approveLeave);
router.get("/dashboard-stats", getDashboardStats);
router.get("/balance/:employeeId", getLeaveBalance);
router.get("/assessment",getLeaveAssessment);

module.exports = router;