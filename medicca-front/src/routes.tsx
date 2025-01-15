import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<></>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
