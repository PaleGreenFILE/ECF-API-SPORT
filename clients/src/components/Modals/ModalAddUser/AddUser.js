import { useRef } from 'react';
const AddUser = ({ addNewModal }) => {
  const cancelButtonRef = useRef(null);
  let form = useRef(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form_data = new FormData(form.current);
    let payload = {};
    form_data.forEach(function (value, key) {
      payload[key] = value;
    });
    // console.log("payload", payload);
    // Place your API call here to submit your payload.
  };

  return (
    <div id="popup-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden absolute z-50 inset-0  md:h-full justify-center items-center" aria-modal="true" role="dialog">
      <form id="login" onSubmit={handleSubmit}>
        <div className="bg-gray-100">
          <div className="container mx-auto bg-white  rounded">
            <div className="xl:w-full border-b border-gray-300  py-5 bg-gray-100 ">
              <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p className="text-lg text-gray-800 font-bold">Nouvel Enregistrerement</p>
                <div className="ml-2 cursor-pointer text-gray-600 ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                    <path
                      className="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto bg-gray-100  mt-10 rounded px-4">
            <div className="xl:w-full border-b border-gray-300 py-5">
              <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                <p className="text-lg text-gray-800 font-bold">Informations Personnel</p>
                <div className="ml-2 cursor-pointer text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                    <path
                      className="heroicon-ui"
                      d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mx-auto pt-4">
              <div className="container mx-auto">
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label htmlFor="Nom" className="pb-2 text-sm font-bold text-gray-800">
                    Nom :<span className="ml-2 text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="Nom"
                    name="Nom"
                    required
                    className="border border-gray-300 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500"
                    placeholder="Nom"
                  />
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label htmlFor="Email" className="pb-2 text-sm font-bold text-gray-800">
                    Email :<span className="ml-2 text-red-500">*</span>
                  </label>
                  <div className="border border-gray-300 shadow-sm rounded flex">
                    <div className="px-4 py-3  flex items-center border-r border-gray-300 bg-blue-800">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-mail"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x={3} y={5} width={18} height={14} rx={2} />
                        <polyline points="3 7 12 13 21 7" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="Email"
                      name="email"
                      required
                      className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label htmlFor="Password" className="pb-2 text-sm font-bold text-gray-800">
                    Mot de passe Temporaire : <span className="ml-2 text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="Password"
                    name="Password"
                    required
                    className="border border-gray-300 pl-3 py-3 shadow-sm rounded bg-transparent text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500"
                    placeholder="Mot de passe Temporaire"
                  />
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label htmlFor="UrlLogo" className="pb-2 text-sm font-bold text-gray-800">
                    Url Logo :<span className="ml-2 text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="UrlLogo"
                    name="UrlLogo"
                    required
                    className="border bg-transparent border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500"
                    placeholder="Url du Logo"
                  />
                </div>
                <select
                  class="block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-gray-100 mb-10 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  name="animals"
                >
                  <option value="">Choisissez....</option>
                  <option value="parnter">Partenaire</option>
                  <option value="structure">Structure</option>
                </select>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label htmlFor="Description" className="pb-2 text-sm font-bold text-gray-800">
                    Petite Description :
                  </label>
                  <input
                    type="text"
                    id="Description"
                    name="Description"
                    className="border bg-transparent border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500"
                    placeholder="Petite Description"
                  />
                </div>
                <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                  <label htmlFor="LongueDescription" className="pb-2 text-sm font-bold text-gray-800">
                    Longue Description :
                  </label>
                  <input
                    type="text"
                    id="LongueDescription"
                    name="LongueDescription"
                    className="border bg-transparent border-gray-300 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 "
                    placeholder="Longue Description"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-10 rounded bg-gray-100 w-11/12 xl:w-full">
            <div className="xl:w-full py-5 px-8">
              <div className="flex items-center mx-auto">
                <div className="container mx-auto">
                  <div className="mx-auto xl:w-full">
                    <p className="text-lg text-gray-800 font-bold">Permissions</p>
                    <p className="text-sm text-gray-500 pt-1">Panel d'administration des permissions pour partenaires et structures</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container mx-auto pb-6">
              <div className="px-8">
                <div className="flex justify-between items-center mb-8 mt-4">
                  <div className="w-9/12">
                    <p className="text-sm text-gray-800 font-bold pb-1">Planning</p>
                    <p className="text-sm text-gray-500">Accés au Planning d'équipe</p>
                  </div>
                  <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                    <input
                      type="checkbox"
                      name="email_comments"
                      id="toggle1"
                      className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto"
                    />
                    <label htmlFor="toggle1" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 cursor-pointer" />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-8">
                  <div className="w-9/12">
                    <p className="text-sm text-gray-800 font-bold pb-1">Newsletter</p>
                    <p className="text-sm text-gray-500">Pouvoir envoyer des newsletters au clients</p>
                  </div>
                  <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                    <input
                      type="checkbox"
                      name="email_job_application"
                      id="toggle2"
                      className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto"
                    />
                    <label htmlFor="toggle2" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 cursor-pointer" />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-8">
                  <div className="w-9/12">
                    <p className="text-sm text-gray-800 font-bold pb-1">Boissons</p>
                    <p className="text-sm text-gray-500">Autorisation de vendre des boissons</p>
                  </div>
                  <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                    <input
                      type="checkbox"
                      name="email_product_update"
                      id="toggle3"
                      className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto"
                    />
                    <label htmlFor="toggle3" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 cursor-pointer" />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-8">
                  <div className="w-9/12">
                    <p className="text-sm text-gray-800 font-bold pb-1">Vendre Vêtements</p>
                    <p className="text-sm text-gray-500">Permettre de vendre des vêtements de la marque au sein de l'entreprise</p>
                  </div>
                  <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                    <input
                      type="checkbox"
                      name="email_product_update"
                      id="toggle3"
                      className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto"
                    />
                    <label htmlFor="toggle3" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 cursor-pointer" />
                  </div>
                </div>
                <div className="flex justify-between items-center mb-8">
                  <div className="w-9/12">
                    <p className="text-sm text-gray-800 font-bold pb-1">Equipements</p>
                    <p className="text-sm text-gray-500">Autorise la vente d'articles d'équipements de Sport</p>
                  </div>
                  <div className="cursor-pointer rounded-full bg-gray-200 relative shadow-sm">
                    <input
                      type="checkbox"
                      name="email_product_update"
                      id="toggle3"
                      className="focus:outline-none checkbox w-6 h-6 rounded-full bg-white absolute shadow-sm appearance-none cursor-pointer border border-transparent top-0 bottom-0 m-auto"
                    />
                    <label htmlFor="toggle3" className="toggle-label block w-12 h-4 overflow-hidden rounded-full bg-gray-300 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto w-11/12 xl:w-full">
            <div className="w-full py-4 sm:px-0 bg-gray-100 flex justify-end">
              <button className="bg-gray-200 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-300 rounded text-indigo-600 px-6 py-2 text-xs mr-4">Annuler</button>
              <button className="bg-indigo-700 focus:outline-none transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-2 text-sm" type="submit">
                Créer
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
