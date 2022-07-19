import React, { useState } from "react";
import { onRegistration } from "./../api/auth";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await onRegistration(values);
      setError("");
      setSucces(data.message);
      setValues({ email: "", password: "" });
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
      setSucces("");
    }
  };

  return (
    <div className="w-full h-screen font-sans bg-cover bg-landscape bg-[url('https://bit.ly/3AKoO89')]">
      <div className="container flex items-center justify-center flex-1 h-full mx-auto">
        <div className="w-full max-w-lg">
          <img src="https://bit.ly/3AHZ3Fy" alt="sport" />
          <div className="leading-loose">
            <form
              onSubmit={(e) => onSubmit(e)}
              id="ecf"
              className="max-w-sm p-10 mb-32 m-auto bg-white bg-opacity-70 rounded shadow-xl"
            >
              <p className="mb-8 text-3xl font-semibold text-center text-black">
                Créer un compte
              </p>
              <div className="mb-2">
                <div className=" relative ">
                  <label htmlFor="email">Email :</label>
                  <input
                    onChange={(e) => onChange(e)}
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
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
                    onChange={(e) => onChange(e)}
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Votre mot de passe"
                    required
                  />
                </div>
              </div>{" "}
              <div className="m-3 text-green-600">{succes}</div>
              <div className="m-3 text-red-600">{error}</div>
              <div className="flex items-center justify-between mt-4">
                <button
                  type="submit"
                  className="g-recaptcha py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Inscription
                </button>
              </div>
              <div className="text-center">
                Déja un compte ?{" "}
                <a
                  href="/login"
                  className="right-0 inline-block text-sm font-light align-baseline text-500 hover:text-gray-800"
                >
                  Se Connecter
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
