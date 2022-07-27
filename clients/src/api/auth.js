import axios from "axios";
import { useParams } from 'react-router-dom';
axios.defaults.withCredentials = true;

export const onRegistration = async (registrationData) => {
  return await axios.post(
    "https://ecf-2022.herokuapp.com/api/auth/signup",
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
  return await axios.post("https://ecf-2022.herokuapp.com/api/auth/logout");
};

export const getAllUsers = async () => {
  return await axios.get("https://ecf-2022.herokuapp.com/api/admin/allusers");
};

export const updateUser = async () => {
  return await axios.delete(`https://ecf-2022.herokuapp.com/api/admin/updateinfo/:id`);
};

export const deleteUser = async ( ) => {
  return await axios.delete(`http://localhost:8800/api/admin/delete/`
  );
};
