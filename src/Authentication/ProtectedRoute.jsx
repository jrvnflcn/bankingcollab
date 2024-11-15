import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Nav from '../Components/Nav/Nav';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (<div><Nav/> <Outlet/></div>) : <Navigate to="/" />;
};

export default ProtectedRoute;
