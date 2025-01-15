import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './pages/Login';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
