import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../Login";
import Dashboard from "../Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import ProjectDetails from "../components/ProjectDetails";
import Contact from "../components/Contact";
import Posts from "../Posts";
import Table from "../Table";
import EditUser from "../EditUser";
import EditPost from "../components/EditPost";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Posts />} />
          <Route path="project/:id" element={<ProjectDetails />} />
          <Route path="edit/:id" element={<EditPost />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/users" element={<Dashboard />}>
          <Route path="" element={<Table />} />
          <Route path="edit/:id" element={<EditUser />} />
        </Route>
      </Route>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
