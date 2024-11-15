import './App.css';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingScreen from './Components/Loading Screen/LS';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import { AuthProvider } from '../src/Authentication/AuthContext';
import ProtectedRoute from '../src/Authentication/ProtectedRoute';
import Budget from './Components/Budget/Budget'


function App() {
  return (
    <AuthProvider>
     
      <Router>
        <div className="App">
          <LoadingScreen />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<ProtectedRoute />}>
              <Route index element={<Home/>}/>
              <Route path="/home/budget" element={<Budget/>}/>
            </Route>
            
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
