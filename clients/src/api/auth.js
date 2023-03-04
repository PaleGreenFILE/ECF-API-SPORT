import axios from "axios";
axios.defaults.withCredentials = true;

// Register Partners, Structures
export const onRegistrationPartners = async (registrationData) => {
  return await axios.post(
    process.env.REACT_APP_REGISTER_PARTNERS,
    registrationData
  );
};
export const onRegistrationStructures = async (registrationData) => {
  return await axios.post(
    process.env.REACT_APP_REGISTER_STRUCTURES,
    registrationData
  );
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

// Get Users By Id request
export const getUsersById = async (id) => {
  return await axios.get(process.env.REACT_APP_GET_USER_BY_ID + id);
};

// Get All Partner in Database
export const getPartners = async () => {
  return await axios.get(process.env.REACT_APP_GET_ALLUSER_PARTNER);
};

// Get Structures By id and By Partner in Database
export const getStructureByPartner = async (id) => {
  return await axios.get(process.env.REACT_APP_GET_STRUCTURES_BY_ID + id);
};

//*/* Route CRUD Admin */*
export const updateUser = async (id, updateUserData) => {
  return await axios.put(
    process.env.REACT_APP_UPDATE_USER + id,
    updateUserData
  );
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

//*/* Route View Info Partners */*
export const viewPartnersStructures = async (id) => {
  return await axios.get(process.env.REACT_APP_VIEW_USER_PARTNERS + id);
};

// First connexion by id Partners & Structures
export const firstConnexion = async (data) => {
  return await axios.put(process.env.REACT_APP_FIRST_CONNEXION, data);
};
