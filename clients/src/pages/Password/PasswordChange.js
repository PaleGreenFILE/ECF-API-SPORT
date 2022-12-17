import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { EMAIL_REGEX_VALIDATION, PASSWORD_REGEX_VALIDATION } from '../../lib/lib';
import emailjs from '@emailjs/browser';
import { firstConnexion } from './../../api/auth';

const PasswordChange = () => {
  const navigate = useNavigate();
  const [succes, setSucces] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorPass, setErrorPass] = useState('');
  const form = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (password !== confirmPass) {
      setErrorPass('Les mot de passe ne correspondent pas !');
      setTimeout(() => {
        setErrorPass('');
      }, 2000);
    } else if (password === confirmPass) {
      try {
        setLoading(true);
        await firstConnexion(data).then((res) => {
          if (res.status === 200) {
            emailjs.sendForm('service_1bqo3e6', 'template_esdx76g', form.current, 'jUhrdIPj2FJVSlQP_').then(() => {
              console.log(res.data);
              setSucces(res.data);
              setTimeout(() => {
                navigate('/');
              }, 4000);
            });
          }
        });
      } catch (err) {
        setError(err.response.data.message);
        console.log(err.response.data.message);
        setLoading(false);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    }
  };

  return (
    <div className="w-full h-screen font-sans bg-cover bg-landscape bg-[url('https://bit.ly/3FjaKmO')]">
      <div className="container flex items-center justify-center flex-1 h-full mx-auto">
        <div className="w-full max-w-lg">
          <div className="leading-loose">
            <form onSubmit={handleSubmit(onSubmit)} ref={form} className="max-w-sm p-10 mb-32 m-auto bg-white bg-opacity-70 rounded shadow-xl">
              <p className="mb-8 text-3xl font-semibold text-center text-black">Mot de passe</p>
              <div className="flex bg-green-300 text-gray-800 text-semibold items-center justify-between mt-5">
                <p className="ml-4 text-sm text-center justify-center items-center">{succes}</p>
              </div>
              <div className="flex bg-red-300 text-gray-800 text-semibold items-center justify-between mt-5">
                <p className="ml-14 text-sm text-center justify-center items-center">{error}</p>
              </div>
              <div className="mb-2">
                <div className=" relative ">
                  <label htmlFor="email">Email :</label>
                  <input
                    {...register('email', { required: true, pattern: EMAIL_REGEX_VALIDATION })}
                    type="email"
                    name="email"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Votre email"
                  />
                  {errors.email && <span className="text-sm text-red-500">Veuillez rentrer un email valide !</span>}
                </div>
              </div>
              <div className="mb-2">
                <div className=" relative ">
                  <label htmlFor="password">Nouveau mot de passe :</label>
                  <input
                    {...register('password', { required: true, pattern: PASSWORD_REGEX_VALIDATION, setValue: { password }, onChange: (e) => setPassword(e.target.value) })}
                    type="password"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Nouveau Mot de passe"
                    required
                  />
                  {errors.password && <span className="text-sm text-red-500">Votre mot de passe doit contenir 8 caractère minimum, une lettre, un nombre et un symbol spécial ! </span>}
                </div>
              </div>
              <div className="mb-2">
                <div className=" relative ">
                  <label htmlFor="password">Confirmation mot de passe :</label>
                  <input
                    {...register('confirmPassword', { required: true, setValue: { confirmPass }, onChange: (e) => setConfirmPass(e.target.value) })}
                    type="password"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Confirmation Mot de passe"
                  />
                  {errors.confirmPassword && <span className="text-sm text-red-500">Les mot de passe ne correspondent pas !</span>}
                  <span className="text-sm text-red-600">{errorPass}</span>
                </div>
              </div>
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
                    className="text-white justify-center ml-20  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-8 py-2.5 text-center mr-2  inline-flex items-center"
                  >
                    Confirmer
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
