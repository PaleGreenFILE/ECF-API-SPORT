import axios from 'axios';
axios.defaults.withCredentials = true;

// Register Admin ,Partners, Structures
export const onRegistrationAdmin = async (registrationData) => {
  return await axios.post(process.env.REACT_APP_REGISTER_ADMIN, registrationData);
};
export const onRegistrationPartners = async (registrationData) => {
  return await axios.post(process.env.REACT_APP_REGISTER_PARTNERS, registrationData);
};
export const onRegistrationStructures = async (registrationData) => {
  return await axios.post(process.env.REACT_APP_REGISTER_STRUCTURES, registrationData);
};

// Login Admin ,Partners ,Structures
export const onLoginAdmin = async (loginData) => {
  return await axios.post(process.env.REACT_APP_LOGIN_ADMIN, loginData);
};
// Logout All Users request
export const onLogout = async () => {
  return await axios.post(process.env.REACT_APP_LOGOUT);
};

// Get all users request
export const getAllUsers = async () => {
  return await axios.get(process.env.REACT_APP_GET_ALLUSER);
};

// Get Structure users request
export const getStructureUsers = async () => {
  return await axios.get(process.env.REACT_APP_GET_STRUCTURES);
};

// Get Parnter users request
export const getPartnerUsers = async () => {
  return await axios.get(process.env.REACT_APP_GET_PARTNERS);
};

//*/* Route CRUD Admin */*
export const updateUser = async (id) => {
  return await axios.put(process.env.REACT_APP_UPDATE_USER_ADMIN + id);
};
export const deleteAdmin = async (id) => {
  return await axios.delete(process.env.REACT_APP_DELETE_USER_ADMIN + id);
};
export const viewAdmin = async (id) => {
  return await axios.get(process.env.REACT_APP_VIEW_USER_ADMIN + id);
};
export const disableUserAdmin = async (id) => {
  return await axios.put(process.env.REACT_APP_DISABLE_USER_ADMIN + id);
};
export const enableAdmin = async (id) => {
  return await axios.put(process.env.REACT_APP_ENABLE_USER_ADMIN + id);
};

//*/* Route CRUD Partners */*
export const viewPartners = async (id) => {
  return await axios.get(process.env.REACT_APP_VIEW_USER_PARTNERS + id);
};

//*/* Route CRUD Structures */*

export const viewStructures = async (id) => {
  return await axios.get(process.env.REACT_APP_VIEW_USER_STRUCTURES + id);
};

// First connexion by id Partners & Structures
export const firstConnexionPartners = async (id) => {
  return await axios.put(process.env.REACT_APP_FIRST_CONNEXION_PARTNERS + id);
};

export const firstConnexionStrucures = async (id) => {
  return await axios.put(process.env.REACT_APP_FIRST_CONNEXION_STRUCTURES + id);
};
