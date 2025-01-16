import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar-conta" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
