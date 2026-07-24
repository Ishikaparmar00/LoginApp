import React from "react";
import "../styles/navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div>
        <h2>Employee Management System</h2>
        <p>Welcome, Admin 👋</p>
      </div>

      <div className="profile-section">
        <span className="profile-name">Admin</span>

        <button
          className="logout-btn"
          onClick={() => alert("Logout Successfully")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;