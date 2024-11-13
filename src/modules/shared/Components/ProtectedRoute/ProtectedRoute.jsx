import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ loginData, children }) {
  // Check if there's a token or loginData
  if (localStorage.getItem("token") || loginData) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
