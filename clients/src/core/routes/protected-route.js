import { Navigate } from 'react-router';
import { useContext } from 'react';
import UserContext from '../../context/user.context.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useContext(UserContext);

  if (!currentUser) {
    <Navigate to="/" replace />;
  } else if (currentUser && !currentUser.role) {
    <Navigate to="/access-denied" replace />;
  }

  return allowedRoles.find((role) => currentUser?.role?.includes(role)) ? children : <Navigate to="/access-denied" replace />;
};

export default ProtectedRoute;
