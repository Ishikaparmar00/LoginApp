import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
function DashboardHome() {
const [stats, setStats] = useState({
  totalEmployees: 0,
  totalLeaves: 0,
  pendingLeaves: 0,
  approvedLeaves: 0,
  rejectedLeaves: 0,
});
const chartData = [
  { name: "Employees", count: stats.totalEmployees },
  { name: "Leaves", count: stats.totalLeaves },
  { name: "Approved", count: stats.approvedLeaves },
  { name: "Pending", count: stats.pendingLeaves },
  { name: "Rejected", count: stats.rejectedLeaves },
];

const pieData = [
  { name: "Approved", value: stats.approvedLeaves },
  { name: "Pending", value: stats.pendingLeaves },
  { name: "Rejected", value: stats.rejectedLeaves },
];

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];
const fetchDashboardStats = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/leaves/dashboard-stats"
    );

    const emp = await axios.get(
      "http://localhost:5000/api/employees"
    );

    setStats({
      totalEmployees: emp.data.length,
      totalLeaves: Number(response.data.total),
      approvedLeaves: Number(response.data.approved),
      pendingLeaves: Number(response.data.pending),
      rejectedLeaves: Number(response.data.rejected),
    });
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchDashboardStats();
}, []);
const cardStyle = {
  background: "#fff",
  borderRadius: "15px",
  padding: "20px",
  width: "180px",
  textAlign: "center",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};
return (
  <div
    style={{
      padding: "25px",
      background: "#f4f6f9",
      minHeight: "100vh",
    }}
  >
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        marginBottom: "25px",
      }}
    >
      <div style={cardStyle}>
        <h3>Total Employees</h3>
        <h2>{stats.totalEmployees}</h2>
      </div>

      <div style={cardStyle}>
        <h3>Total Leaves</h3>
        <h2>{stats.totalLeaves}</h2>
      </div>

      <div style={cardStyle}>
        <h3>Pending Leaves</h3>
        <h2>{stats.pendingLeaves}</h2>
      </div>

      <div style={cardStyle}>
        <h3>Approved Leaves</h3>
        <h2>{stats.approvedLeaves}</h2>
      </div>

      <div style={cardStyle}>
        <h3>Rejected Leaves</h3>
        <h2>{stats.rejectedLeaves}</h2>
      </div>
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "25px",
  }}
>
  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    }}
  >
    <h2>Employee Analytics</h2>

    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    }}
  >
    <h2>Leave Distribution</h2>

    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>
    </div> 
  </div>
);
}

export default DashboardHome;