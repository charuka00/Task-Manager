// src/utils/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ requireAdmin = false }) {
  const token = localStorage.getItem("userToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // If this route requires admin and the user isn't one, block access
    if (requireAdmin && !decoded.isAdmin) {
      return <Navigate to="/" replace />;
    }

    return <Outlet />; // Render the nested protected routes
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
}
