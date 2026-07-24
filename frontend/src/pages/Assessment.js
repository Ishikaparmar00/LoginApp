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

function Assessment() {
  const [assessment, setAssessment] = useState([]);

  const fetchAssessment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/leaves/assessment"
      );

      setAssessment(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAssessment();
  }, []);
  const chartData = assessment.map((item) => ({
  name: item.employee_name,
  Approved: Number(item.approved),
  Rejected: Number(item.rejected),
  Pending: Number(item.pending),
}));

const pieData = [
  {
    name: "Approved",
    value: assessment.reduce(
      (sum, item) => sum + Number(item.approved),
      0
    ),
  },
  {
    name: "Rejected",
    value: assessment.reduce(
      (sum, item) => sum + Number(item.rejected),
      0
    ),
  },
  {
    name: "Pending",
    value: assessment.reduce(
      (sum, item) => sum + Number(item.pending),
      0
    ),
  },
];

const COLORS = ["#22c55e", "#ef4444", "#f59e0b"];

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2>📋 Employee Assessment</h2>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr style={{ background: "#2563eb", color: "#fff" }}>
  <th>Employee</th>
  <th>Total Leaves</th>
  <th>Approved</th>
  <th>Rejected</th>
  <th>Pending</th>
  <th>Performance</th>
</tr>
        </thead>

        <tbody>
  {assessment.map((item, index) => (
    <tr key={index}>
      <td>{item.employee_name}</td>

      <td>{item.total_leaves}</td>

      <td style={{ color: "green", fontWeight: "bold" }}>
        {item.approved}
      </td>

      <td style={{ color: "red", fontWeight: "bold" }}>
        {item.rejected}
      </td>

      <td style={{ color: "orange", fontWeight: "bold" }}>
        {item.pending}
      </td>

      <td>
        {item.approved >= 5
          ? "⭐⭐⭐ Excellent"
          : item.approved >= 3
          ? "⭐⭐ Good"
          : "⭐ Average"}
      </td>
    </tr>
  ))}
</tbody>
      </table>
      <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "30px",
  }}
>
  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,.1)",
    }}
  >
    <h3>Employee Performance</h3>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />

        <Bar dataKey="Approved" fill="#22c55e" />
        <Bar dataKey="Rejected" fill="#ef4444" />
        <Bar dataKey="Pending" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  <div
    style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "15px",
      boxShadow: "0 5px 15px rgba(0,0,0,.1)",
    }}
  >
    <h3>Leave Distribution</h3>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          outerRadius={100}
          label
        >
          {pieData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
    </div>
  );
}

export default Assessment;