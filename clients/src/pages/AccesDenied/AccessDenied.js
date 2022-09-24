import { Button, Result } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const AccessDenied = () => (
  <section>
    <Helmet>
      <title>403 - Accés Refusé</title>
    </Helmet>
    <div className="bg-gray-100 h-screen">
      <div className="flex items-center justify-center py-32">
        <Result
          className="px-4 pt-8 pb-4 text-center text-xl font-bold leading-10 text-gray-800"
          status="403"
          title="Accés Refusé"
          subTitle="Désoler, Vous n'êtes pas autorisé à accéder à cette page."
          extra={
            <Button className="mx-4 h-10 w-44 mt-10 border rounded-md text-white text-base bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-indigo-800">
              <Link to={-1}>Retour</Link>
            </Button>
          }
        />
      </div>
    </div>
  </section>
);

export default AccessDenied;
