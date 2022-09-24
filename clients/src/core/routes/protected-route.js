import { Navigate } from 'react-router';
import { userRoles } from './constants';
import useAuth from './../../hooks/useAuth';

const ProtectedRoute = ({ expectedRoles, children }) => {
  const isAuthorized = useAuth();
  const areRolesRequired = !!expectedRoles?.length;
  const roles = [userRoles.partner];
  const role = areRolesRequired ? expectedRoles.some((r) => roles.indexOf(r) >= 0) : true;

  if (!isAuthorized && !role) {
    return <Navigate to="/" replace />;
  } else if (isAuthorized && !role) {
    return <Navigate to="/access-denied" replace />;
  } else if (isAuthorized && role) {
    return children;
  }
};

export default ProtectedRoute;
