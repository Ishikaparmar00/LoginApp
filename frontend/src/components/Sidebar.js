import React from "react";
import "../styles/sidebar.css";

function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="sidebar">
      <h2>EMS</h2>

      <button onClick={() => setActivePage("dashboard")}>
        📊 Dashboard
      </button>

      <button onClick={() => setActivePage("employee")}>
        👨‍💼 Employees
      </button>

      <button onClick={() => setActivePage("leave")}>
        📝 Leave
      </button>

      <button onClick={() => setActivePage("assessment")}>
        📋 Assessment
      </button>
    </div>
  );
}

export default Sidebar;