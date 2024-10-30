import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './Components/Loading Screen/LS';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home'; // Import your Home component
import { AuthProvider } from '../src/Authentication/AuthContext';
import ProtectedRoute from '../src/Authentication/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          {/* <LoadingScreen /> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute component={Home} />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
