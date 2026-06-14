const express = require("express");
const router = express.Router();

const dashboardController =
require("../controllers/dashboardController");

console.log(dashboardController);

router.get(
  "/stats",
  dashboardController.getDashboardStats
);

module.exports = router;