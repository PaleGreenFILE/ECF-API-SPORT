import axios from "axios";
axios.defaults.withCredentials = true;

// Register request
export const onRegistration = async (registrationData) => {
  return await axios.post(process.env.REACT_APP_REGISTER, registrationData);
};

// Login request
export const onLogin = async (loginData) => {
  return await axios.post(process.env.REACT_APP_LOGIN, loginData);
};

// Logout users request
export const onLogout = async () => {
  return await axios.post(process.env.REACT_APP_LOGOUT);
};

// Get all users request
export const getAllUsers = async () => {
  return await axios.get(process.env.REACT_APP_GET_ALLUSER);
};

// Update users request by id
export const updateUser = async (id) => {
  return await axios.put(process.env.REACT_APP_UPDATE_USER + id);
};

// Delete users request by id
export const deleteUser = async (id) => {
  return await axios.delete(process.env.REACT_APP_DELETE_USER + id);
};

// View users request by id
export const viewUser = async (id) => {
  return await axios.get(process.env.REACT_APP_VIEW_USER + id);
};

// Disable users request by id
export const disableUser = async (id) => {
  return await axios.put(process.env.REACT_APP_DISABLE_USER + id);
};

// Enable users request by id
export const enableUser = async (id) => {
  return await axios.put(process.env.REACT_APP_ENABLE_USER + id);
};

// First connexion by id
export const firstConnexion = async (id) => {
  return await axios.put(process.env.REACT_APP_FIRST_CONNEXION + id);
};
