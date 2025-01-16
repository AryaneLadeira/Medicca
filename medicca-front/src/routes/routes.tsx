import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';
import ProtectedLayout from '../components/templates/ProtectedLayout';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar-conta" element={<Signup />} />
        </Route>

        {/* Rotas Protegidas */}
        <Route element={<ProtectedLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
