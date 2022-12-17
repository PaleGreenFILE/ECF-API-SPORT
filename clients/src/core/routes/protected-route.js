import { Navigate } from 'react-router';
import { useContext } from 'react';
import UserContext from '../../context/user.context.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser } = useContext(UserContext);

  return allowedRoles.find((role) => currentUser.role.includes(role)) ? (
    children
  ) : <Navigate to="/access-denied" replace /> ? (
    !currentUser ? (
      <Navigate to="/" replace />
    ) : (
      <Navigate to="/" replace />
    )
  ) : null;
};

export default ProtectedRoute;
