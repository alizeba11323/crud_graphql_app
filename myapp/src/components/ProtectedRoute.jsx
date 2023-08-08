import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import JWTDecode from "jwt-decode";
function ProtectedRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  try {
    const decodeToken = JWTDecode(token);
    if (token && decodeToken.exp * 1000 > Date.now()) {
      return children;
    } else {
      localStorage.removeItem("token");
      return <Navigate to="/login" state={{ pathname: location.pathname }} />;
    }
  } catch (err) {
    localStorage.removeItem("token");
    console.log(err);
    return <Navigate to="/login" state={{ pathname: location.pathname }} />;
  }
}

export default ProtectedRoute;
