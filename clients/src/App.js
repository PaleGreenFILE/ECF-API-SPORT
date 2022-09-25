import { BrowserRouter as Router } from 'react-router-dom';
import RouteRenderer from './core/routes/route-renderer';
import './App.css';
import { AuthProvider } from './context/AuthProvider';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <RouteRenderer />
      </AuthProvider>
    </Router>
  );
};

export default App;
