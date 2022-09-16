import { Button, Result } from 'antd';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const AccessDenied = () => (
  <section>
    <Helmet>
      <title>403 - Access Denied</title>
    </Helmet>
    <div className="items-center">
      <div className="">
        <Result
          status="403"
          title="403"
          subTitle="Desoler, Vous n'êtes pas autorisé à accéder à cette page."
          extra={
            <Button className="bg-blue-500">
              <Link to="/">Back Home</Link>
            </Button>
          }
        />
      </div>
    </div>
  </section>
);

export default AccessDenied;
