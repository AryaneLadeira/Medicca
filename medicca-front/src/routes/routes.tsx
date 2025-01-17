import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedLayout from '../components/templates/ProtectedLayout';
import Appointments from '../pages/Appointments';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';
import Doctors from '../pages/Doctors';

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
            <Route path="/agendamentos" element={<Appointments />} />
            <Route path="/medicos" element={<Doctors />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
