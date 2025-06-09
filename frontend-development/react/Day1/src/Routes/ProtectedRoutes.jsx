import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoutes() {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
}

export default ProtectedRoutes;
