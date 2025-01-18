import { Navigate, Outlet } from 'react-router-dom';
import LoadingScreen from '../components/organisms/LoadingScreen';
import { useAuthContext } from '../context/AuthContext';

function ProtectedRoute() {
  const { isAuthenticated, loadingToken } = useAuthContext();

  if (loadingToken) {
    return <LoadingScreen />;
  }

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
