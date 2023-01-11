import { useContext } from "react";
import { Navigate } from "react-router";
import { UserContext } from "./../../context/user.context";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const authCtx = useContext(UserContext);
  const areRolesAllowed = !!allowedRoles?.length;
  const roles = localStorage.getItem("role");
  const role = areRolesAllowed
    ? allowedRoles.some((r) => roles.indexOf(r) >= 0)
    : true;

  if (authCtx.isLoggedIn && !role) {
    return <Navigate to="/access-denied" replace />;
  } else if (!authCtx.isLoggedIn) {
    return <Navigate to="/" replace />;
  } else if (authCtx.isLoggedIn && role) {
    return children;
  }
};

export default ProtectedRoute;
