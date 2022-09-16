import { useState } from 'react';
import { Navigate } from 'react-router';
import { userRoles } from './constants';

const ProtectedRoute = ({ expectedRoles, children }) => {
  const isAuthorized = true;
  const areRolesRequired = !!expectedRoles?.length;
  const roles = [userRoles.admin] || [userRoles.partner] || [userRoles.structure];

  const rolesMatch = areRolesRequired ? expectedRoles.some((r) => roles.indexOf(r) > 0) : true;

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;
