// routes/AppRoutes.js
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedLayout from '../components/templates/ProtectedLayout';
import Appointments from '../pages/Appointments';
import Doctors from '../pages/Doctors';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/registrar-conta" element={<Signup />} />

        {/* Rotas Protegidas */}
        <Route element={<ProtectedLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/agendamentos" element={<Appointments />} />
            <Route path="/medicos" element={<Doctors />} />
          </Route>
        </Route>

        {/* Rota para Páginas Não Encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
