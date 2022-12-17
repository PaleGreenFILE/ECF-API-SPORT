import { useContext } from "react";
import UserContext from "../context/user.context";

const useAuth = () => {
    return useContext(UserContext);
}

export default useAuth;