const express = require("express");
const router = express.Router();
const multer = require("multer");

// Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Existing Controller
const {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  testDB
} = require("../controllers/employeeController");

// Get Employees
router.get("/", getEmployees);
router.get("/test-db",testDB);
const validateEmployee = require("../middleware/employeeValidation");
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.post("/", addEmployee);
// Upload Multiple Files (Max 5)
router.post(
  "/upload",
  upload.array("documents", 5),
  (req, res) => {
    res.status(200).json({
      success: true,
      files: req.files,
    });
  }
);

module.exports = router;