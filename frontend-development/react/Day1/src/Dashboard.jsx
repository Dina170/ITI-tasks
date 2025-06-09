import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Posts from "./Posts";

function Dashboard() {
  return (
    <div className="dashboard">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Dashboard;
