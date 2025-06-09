import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <h1>My App</h1>
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
