import { useAuth } from '../../Authentication/AuthContext';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav'

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    
    <div>
        <Nav />
      <h1>Welcome to Home Page!</h1>
      <p>You are logged in successfully.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
