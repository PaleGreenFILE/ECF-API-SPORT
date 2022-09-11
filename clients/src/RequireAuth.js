import { useAuth } from "./authContext";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/" />;
};
