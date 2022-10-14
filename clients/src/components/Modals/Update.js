import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { EMAIL_REGEX_VALIDATION, PASSWORD_REGEX_VALIDATION } from '../../.././src/lib/lib';
import { onRegistrationPartners, onRegistrationStructures } from './../.././api/auth';

const Update = ({ updateModal, confirmUptdate }) => {
  const [loading, setLoading] = useState('');
  const [succes, setSucces] = useState('');
  const [emailSucces, setsuccesEmail] = useState('');
  const [error, setError] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const active = 'activer';
  const [value, setValue] = useState('');

  const form = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const cancelButtonRef = useRef(null);
  const onSubmit = async (data) => {
    try {
      if (value === 'partenaire' && active) {
        console.log(data);
        setLoading(true);
        alert('Etes-vous sur de vouloir Enregistrer un nouveau Partenaire ?');
        await onRegistrationPartners(data).then((res) => {
          if (res.status === 200) {
            emailjs.sendForm('service_1bqo3e6', 'template_c07jq3b', form.current, 'jUhrdIPj2FJVSlQP_').then(() => {
              console.log(res.data);
              setSucces('Partenaire enregistré avec succés.');
              setsuccesEmail('Email envoyé au Partenaire avec succés.');
              setLoading(false);
              console.log(value);
              console.log(data);
              setTimeout(() => {
                setsuccesEmail('');
                setSucces('');
              }, 4000);
            });
          }
        });
      } else if (value === 'structure' && active) {
        setLoading(true);
        alert('Etes-vous sur de vouloir Enregistrer une nouvelle Structure ?');
        await onRegistrationStructures(data).then((res) => {
          if (res.status === 200) {
            emailjs.sendForm('service_1bqo3e6', 'template_c07jq3b', form.current, 'jUhrdIPj2FJVSlQP_').then(() => {
              console.log(res.data);
              setSucces('Structure enregistré avec succés.');
              setsuccesEmail('Email envoyé à la Structure avec succés.');
              setLoading(false);
              console.log(value);
              console.log(data);
              setTimeout(() => {
                setsuccesEmail('');
                setSucces('');
              }, 4000);
            });
          }
        });
      }
    } catch (err) {
      setError("Erreur lors de l'inscription.");
      setErrorEmail('Email non envoyé ! Veuillez recommencer !');
      console.log(err.response.data.message);
      console.log("Erreur lors de l'inscription. Email non envoyé ! Veuillez recommencer ! ");
      setLoading(false);
      setTimeout(() => {
        setError(false);
        setErrorEmail(false);
      }, 4000);
    }
  };
  return (
    <div id="popup" className="z-40 w-full flex fixed justify-center inset-0">
      <div onClick={() => updateModal(false)} ref={cancelButtonRef} className="w-full h-full bg-gray-900 opacity-10 z-0 absolute inset-0" />
      <div className="mx-auto container">
        <div className="flex items-center justify-center h-full w-full">
          <div className="bg-white rounded-md shadow z-50 overflow-y-auto fixed h-5/6 md:w-8/10 lg:w-fit 2xl:w-fit md:h-fit">
            <div className="bg-gray-100 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
              <p className="text-base font-semibold">Panel de Modification Utilisateur</p>
              <button onClick={() => updateModal(false)} ref={cancelButtonRef} className="focus:outline-none">
                <svg width={28} height={28} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 7L7 21" stroke="#A1A1AA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 7L21 21" stroke="#A1A1AA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className="px-4 md:px-20 md:pb-4">
              <div className="flex bg-green-300 text-gray-800 text-semibold items-center justify-between mt-7">
                <p className="ml-10 md:ml-44 text-sm text-center justify-center items-center">{succes}</p>
              </div>
              <div className="flex bg-green-300 text-gray-800 text-semibold items-center ">
                <p className="ml-10 md:ml-40 text-sm text-center justify-center items-center">{emailSucces}</p>
              </div>
              <div className="flex bg-red-300 text-gray-800 text-semibold items-center justify-between mt-5">
                <p className="ml-20 md:ml-52 text-sm text-center justify-center items-center">{error}</p>
              </div>
              <div className="flex bg-red-300 text-gray-800 text-semibold items-center justify-between">
                <p className="ml-20 md:ml-40 text-sm text-center justify-center items-center">{errorEmail}</p>
              </div>
            </div>
            <div className="px-4 md:px-10 pt-5 md:pt-0 md:pb-4 pb-7">
              <form onSubmit={handleSubmit(onSubmit)} ref={form}>
                <div className="md:flex md:space-x-5 items-center ">
                  <div className="flex flex-col md:mr-16">
                    <label htmlFor="name" className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2">
                      Nom :<span className="text-red-600 ml-2">*</span>
                    </label>
                    <input
                      {...register('name', { required: true })}
                      type="text"
                      name="name"
                      className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                      placeholder="Nom"
                    />
                    {errors.name && <span className="text-sm text-red-500">Veuillez rentrer un nom !</span>}
                  </div>

                  <div className="flex flex-col md:py-0 py-4">
                    <label htmlFor="email" className="text-gray-800  text-sm font-bold leading-tight tracking-normal mb-2">
                      Email :<span className="text-red-600 ml-2">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute text-white flex items-center px-2 border-r  h-full bg-indigo-700 rounded-l cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-mail"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <rect x={3} y={5} width={18} height={14} rx={2} />
                          <polyline points="3 7 12 13 21 7" />
                        </svg>
                      </div>
                      <div className="w-72">
                        <input
                          {...register('email', { required: true, pattern: EMAIL_REGEX_VALIDATION })}
                          type="email"
                          name="email"
                          className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-full h-10 flex items-center pl-10 text-sm border-gray-300 rounded border shadow"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    {errors.email && <span className="text-sm text-red-500">Veuillez rentrer un email valide !</span>}
                  </div>
                </div>
                <div className="md:flex md:space-x-5 items-center md:mt-8">
                  <div className="flex flex-col md:mr-16">
                    <label htmlFor="password" className="text-gray-800  text-sm font-bold leading-tight tracking-normal mb-2">
                      Mot de passe Temporaire : <span className="text-red-600 ml-2">*</span>
                    </label>
                    <input
                      {...register('password', { required: true, pattern: PASSWORD_REGEX_VALIDATION })}
                      type="password"
                      className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700 bg-white font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                      placeholder="Mot de passe"
                    />
                    {errors.password && <span className="text-sm text-red-500 w-60">Votre mot de passe doit contenir 8 caractère minimum, une lettre, un nombre et un symbol spécial ! </span>}
                  </div>
                  <div className="flex flex-col md:py-0 py-4 ">
                    <label htmlFor="type" className="text-gray-800 text-sm font-bold leading-tight tracking-normal mb-2">
                      Type :<span className="text-red-600 ml-2">*</span>
                    </label>
                    <div className="w-72 md:w-full bg-white border rounded border-gray-200 py-2.5 px-1 shadow-sm">
                      <select className="text-sm text-gray-500 w-64  focus:outline-none" {...register('role_as')} name="role_as" onChange={(e) => setValue(e.target.value)}>
                        <option>Choisissez...</option>
                        <option value="partenaire">Partenaire</option>
                        <option value="structure">Structure</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="md:flex md:space-x-5 items-center md:mt-7">
                  <div className="flex flex-col md:mr-16">
                    <label htmlFor="email" className="text-gray-800  text-sm font-bold leading-tight tracking-normal mb-2">
                      Petite Description :
                    </label>
                    <input
                      {...register('short_desc')}
                      type="text"
                      name="short_desc"
                      className="text-gray-600  focus:outline-none focus:border focus:border-indigo-700  bg-white font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                      placeholder="Petite Description..."
                    />
                  </div>
                  <div className="flex flex-col md:py-0 py-4 ">
                    <label htmlFor="email" className="text-gray-800  text-sm font-bold leading-tight tracking-normal mb-2">
                      Logo Url :
                    </label>
                    <input
                      {...register('logo_url')}
                      type="text"
                      name="logo_url"
                      className="text-gray-600 focus:outline-none focus:border focus:border-indigo-700  bg-white font-normal w-72 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
                      placeholder="Logo Url"
                    />
                  </div>
                </div>
                <div className="mx-auto flex">
                  <div className="flex flex-col items-start">
                    <div className="py-4 flex items-center">
                      <div className="hidden border rounded-sm w-20 h-5  flex-shrink-0 justify-center items-center relative">
                        <input {...register('active')} name="active" type="text" defaultValue="activer" className="absolute cursor-pointer w-full h-full" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex flex-col md:mr-16">
                  <label htmlFor="email" className="text-gray-800  text-sm font-bold leading-tight tracking-normal mb-2">
                    Longue Description :
                  </label>
                  <textarea
                    {...register('full_desc')}
                    type="text"
                    name="full_desc"
                    placeholder="Longue Description..."
                    className="py-3 pl-3 overflow-y-auto h-24 border rounded border-gray-200 w-72 md:w-full 2xl:w-full resize-none focus:outline-none"
                    defaultValue={''}
                  />
                </div>

                <div className="flex items-center justify-between mt-9">
                  <button
                    type="button"
                    class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-dismiss="modal"
                    onClick={() => updateModal(false)}
                  >
                    Annuler
                  </button>
                  <div className="flex items-center justify-between">
                    {loading ? (
                      <button
                        type="button"
                        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
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
                        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                        onClick={() => confirmUptdate()}
                      >
                        Confirmer
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
