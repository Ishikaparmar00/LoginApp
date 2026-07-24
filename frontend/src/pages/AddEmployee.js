import React, { useState, useEffect } from "react";
import axios from "axios";

function AddEmployee({
  selectedEmployee,
  fetchEmployees
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    designation: "",
    department_id: ""
  });
useEffect(() => {
  if (selectedEmployee) {
    setFormData({
      name: selectedEmployee.name || "",
      email: selectedEmployee.email || "",
      phone: selectedEmployee.phone || "",
      address: selectedEmployee.address || "",
      designation: selectedEmployee.designation || "",
      department_id:
        selectedEmployee.department_id || ""
    });
  }
}, [selectedEmployee]);
const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    if (selectedEmployee) {

      await axios.put(
        `http://localhost:5000/api/employees/${selectedEmployee.id}`,
        formData
      );

      alert("Employee Updated Successfully");

    } else {

      await axios.post(
        "http://localhost:5000/api/employees",
        formData
      );

      alert("Employee Added Successfully");
    }

    fetchEmployees();
    setFormData({
  name: "",
  email: "",
  phone: "",
  address: "",
  designation: "",
  department_id: ""
});

  } catch (error) {
    console.log(error);
    alert(
      error.response?.data?.message  || "Email already exists"
    );
  }
};
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
  return (
  <div className="section">
    <h2>{selectedEmployee ? "Update Employee" : "Add Employee"}</h2>

    <form onSubmit={handleSubmit} className="form-grid">

      <div>
        <label>Name</label>
        <input
  type="text"
  name="name"
  placeholder="Enter Name"
  value={formData.name}
  onChange={handleChange}
  required
/>
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>Phone</label>
        <input
  type="tel"
  name="phone"
  placeholder="Enter Phone"
  value={formData.phone}
  onChange={handleChange}
  maxLength="10"
  pattern="[0-9]{10}"
  required
/>
      </div>

      <div>
        <label>Address</label>
        <input
  type="text"
  name="address"
  placeholder="Enter Address"
  value={formData.address}
  onChange={handleChange}
  required
/>
      </div>

      <div>
        <label>Designation</label>
        <input
  type="text"
  name="designation"
  placeholder="Enter Designation"
  value={formData.designation}
  onChange={handleChange}
  required
/>
      </div>

      <div>
        <label>Department ID</label>
        <input
  type="number"
  name="department_id"
  placeholder="Enter Department ID"
  value={formData.department_id}
  onChange={handleChange}
  required
/>
      </div>

      <button className="submit" type="submit">
        {selectedEmployee ? "Update Employee" : "Add Employee"}
      </button>

    </form>
  </div>
);
}

export default AddEmployee;