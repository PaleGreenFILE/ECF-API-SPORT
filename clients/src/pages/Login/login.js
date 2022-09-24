import { useState } from 'react';
import { onLoginAdmin } from '../../api/auth.js';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { userRoles } from './../../core/routes/constants';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const {setRole} = useState('');
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await onLoginAdmin({
        email: email,
        password: password,
      });
      if (res.data.role_as === 'admin' && res.data.active === 'activer') {
        console.log('Vous êtes un ADMIN');
        const roles = res.data.role_as;
        console.log(roles);
        navigate('/admin/dashboard');
        setError(false);
        setLoading(false);
      } else if (res.data.role_as === 'partenaire' && res.data.active === 'activer') {
        console.log('Vous êtes un PARTENAIRE');
        navigate('/partenaire/dashboard');
        setError(false);
        setLoading(false);
      } else if (res.data.structure_role === 'structure' && res.data.structure_active === 'activer') {
        console.log('Vous êtes une structure');
        navigate('/structure/dashboard');
        setError(false);
        setLoading(false);
      } else if ((res.data.active === 'desactiver' && res.data.role_as === 'admin', 'partenaire' && res.data.structure_role === 'structure' && res.data.structure_active === 'desactiver')) {
        setError("Votre compte n'est pas activé, merci de contacter un Administrateur !");
        setLoading(false);
      }
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setLoading(false);
        setError(false);
      }, 2000);
    }
  };

  return (
    <>
      <Helmet>
        <title>FitPark Fitness || 2023</title>
      </Helmet>
      <div className="w-full h-screen font-sans bg-cover bg-landscape bg-[url('https://bit.ly/3AKoO89')]">
        <div className="container flex items-center justify-center flex-1 h-full mx-auto">
          <div className="w-full max-w-lg">
            <img src="https://bit.ly/3AHZ3Fy" alt="sport" />
            <div className="leading-loose">
              <form onSubmit={onSubmit} className="max-w-sm p-10 mb-32 m-auto bg-white bg-opacity-70 rounded shadow-xl">
                <p className="mb-8 text-3xl font-semibold text-center text-black">Connexion</p>
                <div className="mb-2">
                  <div className=" relative ">
                    <label htmlFor="email">Email :</label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      name="email"
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
                <div className="flex text-red-600 text-semibold items-center justify-between mt-5">{error}</div>
                <div className="flex items-center justify-between mt-5">
                  {loading ? (
                    <button
                      type="button"
                      className="text-white justify-center ml-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
                    >
                      <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        ></path>
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                      En attente...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="text-white justify-center ml-20 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-9 py-2.5 text-center mr-2  inline-flex items-center"
                    >
                      Connexion
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
