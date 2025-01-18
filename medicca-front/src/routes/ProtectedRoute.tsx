import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // Usando a função de contexto

function ProtectedRoute() {
  const { isAuthenticated, loadingToken } = useAuthContext(); // Garantindo que o contexto não é undefined

  if (loadingToken) {
    return <div>Loading...</div>;
  }

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
