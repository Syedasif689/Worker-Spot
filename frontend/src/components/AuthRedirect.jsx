import { Navigate } from "react-router-dom";
import { getToken, getUser } from "../utils/auth";
import Home from "../pages/Home/Home";

function AuthRedirect() {
  const token = getToken();
  const user = getUser();

  if (token && user) {
    if (user.role === "WORKER") {
      return (
        <Navigate
          to="/worker-dashboard"
          replace
        />
      );
    }

    if (user.role === "CUSTOMER") {
      return (
        <Navigate
          to="/customer-dashboard"
          replace
        />
      );
    }
  }

  return <Home />;
}

export default AuthRedirect;