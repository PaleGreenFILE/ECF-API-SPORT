import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

let logoutTimer;

export const UserContext = createContext({

  currentUser: "",
  userRole: "",
  isUserRole: "",
  isLoggedIn: false,
  login: (currentUser) => {},
  roles: (userRole) => {},
  logout: () => {},
});

const calculateRemaininTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;
  return remainingDuration;
};

const RetrieveStoredUser = () => {
  const storedUser = localStorage.getItem("currentUser");
  const storedExpirationDate = localStorage.getItem("expiresIn");
  const storedRole = localStorage.getItem("role");

  const remainingTime = calculateRemaininTime(storedExpirationDate);
  if (remainingTime <= 60000) {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("role");

    return null;
  }
  return {
    currentUser: storedUser,
    userRole: storedRole,
    duration: remainingTime,
  };
};

export const UserProvider = ({ children }) => {
  const userData = RetrieveStoredUser();
  let initialUser;
  let initialRole;
  if (userData) {
    initialUser = userData.currentUser;
    initialRole = userData.userRole;
  }

  const [currentUser, setCurrentUser] = useState(initialUser);
  const [userRole, setUserRole] = useState(initialRole);

  const userIsLoggedIn = !!currentUser;
  const userRoleIsRequired = !!userRole;

  const logoutHandler = useCallback(() => {
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("expiresIn");
    localStorage.removeItem("role");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (currentUser, expirationTime) => {
    setCurrentUser(currentUser);
    localStorage.setItem("currentUser", currentUser);
    localStorage.setItem("expiresIn", expirationTime);
    const remainingTime = calculateRemaininTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const roleHandler = (userRole) => {
    setUserRole(userRole);
    localStorage.setItem("role", userRole);
  };

  useEffect(() => {
    if (userData) {
      logoutTimer = setTimeout(logoutHandler, userData.duration);
    }
  }, [userData, logoutHandler]);

  const value = {
    currentUser: currentUser,
    userRole: userRole,
    isUserRole: userRoleIsRequired,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    roles: roleHandler,
    logout: logoutHandler,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
