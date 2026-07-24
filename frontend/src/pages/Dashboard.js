import Sidebar from "../components/Sidebar";
import DashboardHome from "./DashboardHome";
import Employee from "./Employees";
import Leave from "./Leave";
import Assessment from "./Assessment";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import React, { useState } from "react";

function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");

 return (
  <div
    style={{
      padding: "25px",
      background: "#f4f6f9",
      minHeight: "100vh",
    }}
  >
    <Sidebar
      activePage={activePage}
      setActivePage={setActivePage}
    />

    <div style={{ marginLeft: "240px" }}>
      <Navbar />

      {activePage === "dashboard" && <DashboardHome />}
      {activePage === "employee" && <Employee />}
      {activePage === "leave" && <Leave />}
      {activePage === "assessment" && <Assessment />}
    </div>
  </div>
);
}

export default Dashboard;