import { useRef } from 'react';

const Delete = ({ deleteModal, confirmDelete }) => {
  const cancelButtonRef = useRef(null);

  return (
    <div>
      <div
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-full h-modal md:h-full justify-center items-center flex"
        aria-modal="true"
      >
        <div onClick={() => deleteModal(false)} ref={cancelButtonRef} className="w-full h-full bg-gray-900 opacity-10 z-0 absolute inset-0" />
        <div className="relative p-4 w-full max-w-xl">
          <div className="relative bg-gray-100 rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="popup-modal"
              onClick={() => deleteModal(false)}
            >
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className="p-6 text-center">
              <svg aria-hidden="true" className="mx-auto mb-4 w-10 h-10 text-red-600 bg-red-300 rounded-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-lg font-semibold">Supprimer</span>
              <h3 className="mb-5 text-lg font-normal text-gray-400 ">Êtes-vous sûr de vouloir supprimer ce compte ? Attention toutes vos données seront supprimées.</h3>{' '}
              <button
                data-modal-toggle="popup-modal"
                type="button"
                onClick={() => deleteModal(false)}
                ref={cancelButtonRef}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Annuler
              </button>
              <button
                onClick={() => confirmDelete()}
                data-modal-toggle="popup-modal"
                type="button"
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300  font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ml-10"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
