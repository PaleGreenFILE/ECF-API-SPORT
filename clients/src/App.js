import { BrowserRouter as Router } from 'react-router-dom';
import RouteRenderer from './core/routes/route-renderer';

import './App.css';

const App = () => {
  return (
    <Router>
      <RouteRenderer />
    </Router>
  );
};

export default App;
