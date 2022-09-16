import { Button, Result } from 'antd';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section>
      <Helmet>
        <title>404 - Not Found</title>
      </Helmet>
      <div className="items-center">
        <div className="">
          <Result
            status="404"
            title="404"
            subTitle="La page que vous recherchez est introuvable."
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
};
export default NotFound;
