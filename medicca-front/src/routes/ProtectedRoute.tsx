import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const isAuthenticated = !!sessionStorage.getItem('authToken');
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
