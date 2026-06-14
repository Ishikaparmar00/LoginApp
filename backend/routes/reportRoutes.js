const express = require("express");
const router = express.Router();

const { getLeaveReport } = require("../controllers/reportController");

// GET Leave Report
router.get("/leave-report", getLeaveReport);

module.exports = router;