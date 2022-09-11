import { useState } from "react";
import {
  onLoginAdmin,
  onLoginPartners,
  onLoginStructures,
} from "../../api/auth.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await onLoginAdmin({
      email: email,
      password: password,
    });
    if (res.data.role_as === "admin" && res.data.active === "activer") {
      console.log("Vous êtes un ADMIN");
      navigate("/admin/dashboard");
      setError(false);
    } else if (
      res.data.role_as === "partenaire" &&
      res.data.active === "activer"
    ) {
      console.log("Vous êtes un partenaire");
      navigate("/partenaire/dashboard");
      setError(false);
    } else if (
      res.data.structure_role === "structure" &&
      res.data.structure_active === "activer"
    ) {
      console.log("Vous êtes une structure");
      navigate("/structure/dashboard");
      setError(false);
    } else if (
      (res.data.active === "desactiver" && res.data.role_as === "admin") ||
      (res.data.role_as === "partenaire" && res.data.active === "desactiver") ||
      (res.data.structure_role === "structure" &&
        res.data.structure_active === "desactiver")
    ) {
      setError(
        "Votre compte n'est pas activé, merci de contacter un Administrateur !"
      );
    }
    setError(res.data);
  };

  return (
    <div className="w-full h-screen font-sans bg-cover bg-landscape bg-[url('https://bit.ly/3AKoO89')]">
      <div className="container flex items-center justify-center flex-1 h-full mx-auto">
        <div className="w-full max-w-lg">
          <img src="https://bit.ly/3AHZ3Fy" alt="sport" />
          <div className="leading-loose">
            <form
              onSubmit={onSubmit}
              className="max-w-sm p-10 mb-32 m-auto bg-white bg-opacity-70 rounded shadow-xl"
            >
              <p className="mb-8 text-3xl font-semibold text-center text-black">
                Connexion
              </p>
              <div className="mb-2">
                <div className=" relative ">
                  <label htmlFor="email">Email :</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="technical_contact"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Votre email"
                    required
                  />
                </div>
              </div>
              <div className="mb-2">
                <div className=" relative ">
                  <label htmlFor="password">Mot de passe :</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Votre mot de passe"
                    required
                  />
                </div>
              </div>
              <div className="flex text-red-600 text-semibold items-center justify-between mt-5">
                {error}
              </div>
              <div className="flex items-center justify-between mt-5">
                <button
                  type="submit"
                  className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Se Connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
