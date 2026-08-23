import { Navigate } from "react-router-dom";
import { getToken, getUser } from "../utils/auth";

function ProtectedRoute({ children, role }) {
  const token = getToken();
  const user = getUser();

  console.log("ProtectedRoute:");
  console.log("Token exists:", !!token);
  console.log("User:", user);
  console.log("Required role:", role);

  // Not logged in
  if (!token || !user) {
    return (
      <Navigate
        to={
          role === "WORKER"
            ? "/worker-login"
            : "/customer-login"
        }
        replace
      />
    );
  }

  // Wrong role
  if (role && user.role !== role) {
    return (
      <Navigate
        to={
          user.role === "WORKER"
            ? "/worker-dashboard"
            : "/customer-dashboard"
        }
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;