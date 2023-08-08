import React from "react";
import { Navigate, useLocation } from "react-router-dom";
function ProtectedRoute({ children }) {
  const location = useLocation();

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" state={{ pathname: location.pathname }} />;
  }
}

export default ProtectedRoute;
