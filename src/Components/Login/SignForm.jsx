import { useState } from "react";
import logo from "./assets/Northland Bank Logo-2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";

const SignForm = ({ onLoginSuccess }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/database/credentials.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const users = await response.json();
      console.log('Fetched Users:', users);

      const user = users.find(
        (user) => user.employeeId.toString() === employeeId && user.password === password
      );

      if (user) {
        login(); 
        onLoginSuccess(); 
      } else {
        setError("Invalid Employee ID or Password");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("An error occurred while trying to log in.");
    }
  };

  return (
    <div id="signform">
      <img src={logo} id="sign-logo" alt="Logo" />
     
      <form id="inputs" onSubmit={handleLogin}>
        <input
          type="number"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button id="login-btn" type="submit">Login</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SignForm;