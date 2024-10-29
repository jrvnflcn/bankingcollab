import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
