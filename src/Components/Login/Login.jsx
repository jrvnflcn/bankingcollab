import "./Login.css";
import background from "./assets/Background.mp4";
import SignForm from "./SignForm";
import { useAuth } from "../../Authentication/AuthContext"; 
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  const handleLoginSuccess = () => {
    setFadeOut(true);
    setTimeout(() => {
      navigate("/home");
    }, 500);
  };

  return (
    <div className={`login-container ${fadeOut ? "fade-out" : ""}`}>
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        src={background}
        type="video/mp4"
      ></video>
      <div id="sign-container">
        <SignForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default Login;
