// SignForm.jsx
import { useState } from "react";
import logo from "./assets/Northland Bank Logo-2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Authentication/AuthContext";

const SignForm = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("/database/credentials.json");
    const users = await response.json();

    const user = users.find(
      (user) => user.employeeId === employeeId && user.password === password
    );

    if (user) {
      login();
      navigate("/home");
    } else {
      setError("Invalid Employee ID or Password");
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
        <button id="login-btn" type="submit">
          Login
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SignForm;
