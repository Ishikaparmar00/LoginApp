import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      alert(res.data.message);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
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
    padding: "45px",
    borderRadius: "20px",
    width: "430px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
    border: "1px solid #e2e8f0",
  }}
>
<div
  style={{
    fontSize: "60px",
    textAlign: "center",
    marginBottom: "10px",
  }}
>
  👨‍💼
</div>
<h1
  style={{
    textAlign: "center",
    color: "#2563eb",
    marginBottom: "5px",
    fontSize: "30px",
    fontWeight: "700",
  }}
>
  Employee Management System
</h1>
<p
  style={{
    textAlign: "center",
    color: "#64748b",
    marginBottom: "30px",
    fontSize: "16px",
  }}
>
  Welcome Back 👋 <br />
  Please login to continue
</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  border: "1px solid #d1d5db",
  borderRadius: "10px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
}}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
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
  padding: "14px",
  background: "linear-gradient(90deg,#2563eb,#4f46e5)",
  color: "#fff",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
  transition: "0.3s",
}}
          >
            Login
          </button>
        </form>
        <p
  style={{
    textAlign: "center",
    marginTop: "15px",
    color: "#64748b",
  }}
>
  Don't have an account?{" "}
  <Link
    to="/signup"
    style={{
      color: "#2563eb",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    Sign Up
  </Link>
</p>
      </div>
    </div>
  );
}

export default Login;