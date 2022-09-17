import React from 'react';

const FirstConnection = () => {
  return (
    <div className="py-8">
      <div role="alert" className="container mx-auto w-11/12 md:w-2/3 max-w-lg flex justify-center">
        <div className="relative w-11/12 sm:w-8/12 md:w-9/12 bg-white dark:bg-gray-800 shadow  pt-10 pb-8 rounded">
          <div className="flex flex-col items-center px-4 md:px-12">
            <img src="https://i.ibb.co/QDMrqK5/Saly-10.png" />
            <p className="text-base sm:text-lg md:text-2xl font-bold md:leading-6 mt-6 text-gray-800 text-center dark:text-gray-100">Premiere</p>
            <p className="text-xs sm:text-sm leading-5 mt-2 sm:mt-4 text-center text-gray-600 dark:text-gray-300">
              Get yourself ready for the whole new collection of premium and attractive products made just for you.
            </p>
            <div className="flex items-center mt-4 sm:mt-6 w-full">
              <div className="bg-gray-50 border rounded border-gray-200 dark:border-gray-700 dark:bg-gray-700 w-full">
                <input
                  className="w-full focus:outline-none pl-4 py-3 text-sm leading-none text-gray-600 dark:text-gray-100 bg-transparent placeholder-gray-600 dark:placeholder-gray-100"
                  placeholder="Enter your email"
                />
              </div>
              <button className="px-3 py-3 bg-indigo-700 dark:bg-indigo-600 focus:outline-none hover:bg-opacity-80 ml-2 rounded">
                <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.62163 7.76261C1.18663 7.61761 1.18247 7.38345 1.62997 7.23428L17.5358 1.93261C17.9766 1.78595 18.2291 2.03262 18.1058 2.46428L13.5608 18.3693C13.4358 18.8101 13.1816 18.8251 12.995 18.4068L9.99997 11.6668L15 5.00011L8.3333 10.0001L1.62163 7.76261Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="cursor-pointer absolute top-0 right-0 m-3 text-gray-800 dark:text-gray-100 transition duration-150 ease-in-out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Close"
              className="icon icon-tabler icon-tabler-x"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1={18} y1={6} x2={6} y2={18} />
              <line x1={6} y1={6} x2={18} y2={18} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstConnection;
