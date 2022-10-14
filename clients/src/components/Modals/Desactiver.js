import { useRef } from 'react';
const Desactiver = ({ disableModal, userDisable, userActivate }) => {
  const cancelButtonRef = useRef(null);

  return (
    <div>
      <div
        id="popup-modal"
        tabIndex="-1"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full md:inset-0 h-modal md:h-full justify-center items-center flex"
        aria-modal="true"
        role="dialog"
      >  <div onClick={() => disableModal(false)} ref={cancelButtonRef} className="w-full h-full bg-gray-900 opacity-10 z-0 absolute inset-0" />

        <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow mt-40 sm:mt-0">

            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="popup-modal"
              onClick={() => disableModal(false)}
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
              <span className="text-lg font-semibold">Désactiver</span>
              <h3 className="mb-5 text-lg font-normal text-gray-400 ">
                Êtes-vous sûr de vouloir désactiver ce compte ? Il ne sera pas Supprimer.
                <br />
                <p className="text-lg font-semibold text-red-500">Ou</p>
                <span className="text-lg font-semibold text-gray-600">Activer le compte</span>
                <br />
                Vous pourrez aussi ré-activer le compte
              </h3>{' '}
              <button
                    type="button"
                    className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                    data-bs-dismiss="modal"
                    onClick={() => disableModal(false)}
                  >
                Annuler
              </button>
              <button
                onClick={() => userDisable()}
                data-modal-toggle="popup-modal"
                type="button"
                className={` inline-block px-5 py-2.5 ml-10 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out`}
              >
                Désactiver
              </button>
              <button
                onClick={() => userActivate()}
                data-modal-toggle="popup-modal"
                type="button"
                className={` inline-block px-6 py-2.5 mt-2 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out sm:ml-10`}
              >
                Activer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desactiver;
