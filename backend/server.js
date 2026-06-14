require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const departmentRoutes = require("./routes/departmentRoutes");
const skillRoutes = require("./routes/skillRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const reportRoutes = require("./routes/reportRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const leaveTypeRoutes = require("./routes/leaveTypeRoutes");
const healthRoutes = require("./routes/healthRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/leave-types", leaveTypeRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/v1/employees", employeeRoutes);

app.get("/",(req,res)=> {
  res.send("Backend Running Successfully");
});
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});