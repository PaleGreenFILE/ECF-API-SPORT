import axios from "axios";
axios.defaults.withCredentials = true;

export const onRegistration = async (registrationData) => {
  return await axios.post(
    "https://backend-ecf.herokuapp.com/api/auth/signup",
    registrationData
  );
};

export const onLogin = async (loginData) => {
  return await axios.post(
    "https://ecf-2022.herokuapp.com/api/auth/signin",
    loginData
  );
};

export const onLogout = async () => {
  return await axios.get("https://ecf-2022.herokuapp.com/api/logout");
};

export const getAllUsers = async () => {
  return await axios.get("https://ecf-2022.herokuapp.com/api/admin/allusers/");
};
