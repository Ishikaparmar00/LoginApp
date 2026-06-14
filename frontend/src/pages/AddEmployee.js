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
    <form onSubmit={handleSubmit}>
      <input
  name="name"
  placeholder="Name"
  value={formData.name}
  onChange={handleChange}
/>

<input
  name="email"
  placeholder="Email"
  value={formData.email}
  onChange={handleChange}
/>

<input
  name="phone"
  placeholder="Phone"
  value={formData.phone}
  onChange={handleChange}
/>

<input
  name="address"
  placeholder="Address"
  value={formData.address}
  onChange={handleChange}
/>

<input
  name="designation"
  placeholder="Designation"
  value={formData.designation}
  onChange={handleChange}
/>

<input
  name="department_id"
  placeholder="Department ID"
  value={formData.department_id}
  onChange={handleChange}
/>
      <button type="submit">
  {
    selectedEmployee
      ? "Update Employee"
      : "Add Employee"
  }
</button>
    </form>
  );
}

export default AddEmployee;