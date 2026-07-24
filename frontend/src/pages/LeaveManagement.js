import "../styles/leave.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
const LeaveManagement = ({ refreshDashboard }) => {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
const [leaveTypes, setLeaveTypes] = useState([]);
const [leaveBalance, setLeaveBalance] = useState([]);
const [assessment, setAssessment] = useState([]);

  const [formData, setFormData] = useState({
    employee_id: "",
    leave_type_id: "",
    from_date: "",
    to_date: "",
    reason: ""
  });
const fetchLeaveTypes = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/leave-types"
    );

    setLeaveTypes(response.data);

  } catch (error) {
    console.error(error);
  }
};
const fetchLeaves = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/leaves"
    );

    setLeaves(response.data);

  } catch (error) {
    console.error(error);
  }
};
const fetchLeaveBalance = async (employeeId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/leaves/balance/${employeeId}`
    );

    setLeaveBalance(response.data);

  } catch (error) {
    console.error(error);
  }
};
const fetchAssessment = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/leaves/assessment"
    );

    setAssessment(response.data);

  } catch (error) {
    console.error(error);
  }
};
const fetchEmployee = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/employees"
    );

    setEmployees(response.data);

  } catch (error) {
    console.error(error);
  }
};
  useEffect(() => {
    fetchLeaves();
    fetchEmployee();
    fetchLeaveTypes();
    fetchAssessment();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    try {
        console.log("Submitting to:", "http://localhost:5000/api/leaves");
      const response = await fetch(
        "http://localhost:5000/api/leaves",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );
      console.log("Response status:", response.status);

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        alert("Leave Applied Successfully");

        setFormData({
          employee_id: "",
          leave_type_id: "",
          from_date: "",
          to_date: "",
          reason: ""
        });

        fetchLeaves();
if (refreshDashboard) {
  refreshDashboard();
}
      } else {
        alert(data.message || "Failed to apply leave");
      }
    } catch (error) {
      console.error("Error applying leave:", error);
      alert("Server Error");
    }
  };
  const approveLeave = async (id, action) => {
  try {
    await axios.put(
      `http://localhost:5000/api/leaves/${id}/approve`,
      {
        approved_by: 13,
        action,
        remarks: action
      }
    );

    fetchLeaves();

    if (refreshDashboard) {
      refreshDashboard();
    }

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="leave-container">
      <h2>Leave Management</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <br />
        <select
  name="employee_id"
  value={formData.employee_id}
  onChange={(e) => {
  handleChange(e);
  fetchLeaveBalance(e.target.value);
}}
  required
>
  <option value="">
    Select Employee
  </option>

  {employees.map((emp) => (
    <option key={emp.id} value={emp.id}>
      {emp.name}
    </option>
  ))}
</select>
{leaveBalance.length > 0 && (
  <div>
    <h4>Leave Balance</h4>

    {leaveBalance.map((item) => (
      <p key={item.id}>
        {item.leave_name} : {item.available_days} Days
      </p>
    ))}
  </div>
)}
        </div>

        <br />

        <div>
          <label>Leave Type ID:</label>
          <br />
          <select
  name="leave_type_id"
  value={formData.leave_type_id}
  onChange={handleChange}
  required
>
  <option value="">
    Select Leave Type
  </option>

  {leaveTypes.map((type) => (
    <option
      key={type.id}
      value={type.id}
    >
      {type.leave_name}
    </option>
  ))}
</select>
        </div>

        <br />

        <div>
          <label>From Date:</label>
          <br />
          <input
            type="date"
            name="from_date"
            value={formData.from_date}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>To Date:</label>
          <br />
          <input
            type="date"
            name="to_date"
            value={formData.to_date}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Reason:</label>
          <br />
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">
          Apply Leave
        </button>
      </form>

      <hr />

      <h3>Leave List</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Total Days</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
            
          </tr>
        </thead>
<tbody>
  {leaves.map((leave) => (
    <tr key={leave.id}>
  <td>{leave.id}</td>
  <td>{leave.employee_name}</td>
  <td>{leave.leave_name}</td>

  <td>
    {new Date(leave.from_date)
      .toISOString()
      .split("T")[0]}
  </td>

  <td>
    {new Date(leave.to_date)
      .toISOString()
      .split("T")[0]}
  </td>

  <td>{leave.total_days}</td>
  <td>{leave.reason}</td>
  <td>
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "20px",
      color: "#fff",
      background:
        leave.status === "Approved"
          ? "#22c55e"
          : leave.status === "Rejected"
          ? "#ef4444"
          : "#f59e0b"
    }}
  >
    {leave.status}
  </span>
</td>
<td>
  <button
  style={{
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    marginRight: "8px",
    cursor: "pointer"
  }}
  onClick={() => approveLeave(leave.id, "Approved")}
>
  ✓ Approve
</button>

<button
  style={{
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  }}
  onClick={() => approveLeave(leave.id, "Rejected")}
>
  ✕ Reject
</button>
</td>
</tr>
  ))}
</tbody>
      </table>
      <hr />

<h3>Leave Assessment</h3>

<table border="1" cellPadding="10">
  <thead>
    <tr>
      <th>Employee</th>
      <th>Total Leaves</th>
      <th>Approved</th>
      <th>Rejected</th>
      <th>Pending</th>
    </tr>
  </thead>

  <tbody>
    {assessment.map((item, index) => (
      <tr key={index}>
        <td>{item.employee_name}</td>
        <td>{item.total_leaves}</td>
        <td>{item.approved}</td>
        <td>{item.rejected}</td>
        <td>{item.pending}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default LeaveManagement;