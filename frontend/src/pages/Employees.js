import React, { useEffect, useState } from "react";
import axios from "axios";
import AddEmployee from "./AddEmployee";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [search, setSearch] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/employees"
      );
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Employee?")) return;

    await axios.delete(
      `http://localhost:5000/api/employees/${id}`
    );

    fetchEmployees();
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>

      <AddEmployee
        selectedEmployee={selectedEmployee}
        fetchEmployees={fetchEmployees}
      />

      <hr />

      <h2>Employee List</h2>

      <input
        type="text"
        placeholder="Search Employee"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department_name}</td>
              <td>{emp.phone}</td>
              <td>{emp.designation}</td>

              <td>
                <button
                  onClick={() => setSelectedEmployee(emp)}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default Employees;