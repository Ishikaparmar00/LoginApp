import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      console.log("Response:", res.data);
alert("Registration Successful");
navigate("/");
      if (res.data.success){
        alert(res.data.message);
      }else{
        alert(res.data.message);
      }
    } catch (error) {
  alert(
    error.response?.data?.message ||
    "Signup Failed");
 }
  };

    return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg,#2563eb,#7c3aed)",
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "40px",
        borderRadius: "20px",
        width: "400px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.2)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#1e293b",
          marginBottom: "10px",
        }}
      >
        Employee Management System
      </h1>

      <p
        style={{
          textAlign: "center",
          color: "#64748b",
          marginBottom: "25px",
        }}
      >
        Create your account
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
            fontSize: "15px",
          }}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
            fontSize: "15px",
          }}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
            fontSize: "15px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Register
        </button>
      </form>
      <p
  style={{
    textAlign: "center",
    marginTop: "18px",
    color: "#64748b",
  }}
>
  Already have an account?{" "}
  <Link
    to="/"
    style={{
      color: "#2563eb",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    Login
  </Link>
</p>
    </div>
  </div>
);
}
export default Signup;