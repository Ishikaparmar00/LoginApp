import React, { useEffect, useState } from "react";
import axios from "axios";
import AddEmployee from "./AddEmployee";
import LeaveManagement from "./LeaveManagement";
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




function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalLeaves: 0,
    pendingLeaves: 0,
    approvedLeaves: 0,
    rejectedLeaves: 0,
  });
const chartData = [
    {
      name: "Employees",
      count: stats.totalEmployees,
    },
    {
      name: "Leaves",
      count: stats.totalLeaves,
    },
    {
      name: "Approved",
      count: stats.approvedLeaves,
    },
    {
      name: "Pending",
      count: stats.pendingLeaves,
    },
    {
      name: "Rejected",
      count: stats.rejectedLeaves,
    },
  ];
const pieData = [
  {
    name: "Approved",
    value: stats.approvedLeaves,
  },
  {
    name: "Pending",
    value: stats.pendingLeaves,
  },
  {
    name: "Rejected",
    value: stats.rejectedLeaves,
  },
];
const COLORS = [
  "#22c55e",
  "#f59e0b",
  "#ef4444",
];
  useEffect(() => {
    fetchEmployees();
    fetchDashboardStats();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/employees"
      );

      setEmployees(res.data);

      setStats((prev) => ({
        ...prev,
        totalEmployees: res.data.length,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/leaves/dashboard-stats"
      );
      console.log(response.data);

      setStats((prev) => ({
        ...prev,
        totalLeaves: Number(response.data.total),
        approvedLeaves: Number(response.data.approved),
        pendingLeaves: Number(response.data.pending),
        rejectedLeaves: Number(response.data.rejected),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/employees/${id}`
      );

      fetchEmployees();

      alert("Employee Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  

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
      <h1
        style={{
          color: "#1e293b",
          marginBottom: "20px",
        }}
      >
        Employee Management Dashboard
      </h1>
      <AddEmployee
        selectedEmployee={selectedEmployee}
        fetchEmployees={fetchEmployees}
         />
        

      {/* Cards */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginTop: "20px",
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
      </div>

      {/* Chart */}
<div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "25px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        }}
      ></div>
        <h2>Company Analytics</h2>
  
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
          <Bar
            dataKey="count"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />
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

     {/* Employee Table */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          marginBottom: "25px",
          overflowX: "auto",
        }}
      >
        <h2>Employees</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#e2e8f0",
              }}
            >
              <th style={{ padding: "10px" }}>ID</th>
              <th style={{ padding: "10px" }}>Name</th>
              <th style={{ padding: "10px" }}>Email</th>
              <th style={{ padding: "10px" }}>Department</th>
              <th style={{ padding: "10px" }}>Phone</th>
              <th style={{ padding: "10px" }}>Address</th>
              <th style={{ padding: "10px" }}>Designation</th>
              <th style={{ padding: "10px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td style={{ padding: "10px" }}>{emp.id}</td>
                <td style={{ padding: "10px" }}>{emp.name}</td>
                <td style={{ padding: "10px" }}>{emp.email}</td>
                <td style={{ padding: "10px" }}>
                  {emp.department_name}
                </td>
                <td style={{ padding: "10px" }}>{emp.phone}</td>
                <td style={{ padding: "10px" }}>{emp.address}</td>
                <td style={{ padding: "10px" }}>
                  {emp.designation}
                </td>

                <td style={{ padding: "10px" }}>
                  <button
                    onClick={() =>
                      setSelectedEmployee(emp)
                    }
                    style={{
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(emp.id)
                    }
                    style={{
                      marginLeft: "10px",
                      background: "#dc2626",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leave Management */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        }}
      >
        <LeaveManagement
          refreshDashboard={fetchDashboardStats}
        />
      </div>
    </div>
  );
}

export default Dashboard;