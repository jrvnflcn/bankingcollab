import React, { useState } from "react";
import { useAuth } from "../../Authentication/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "./assets/Northland Bank Logo-2.png";
import "./Nav.css";

const Nav = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav id="navContainer">
      <img src={logo} alt="Northland Bank Logo" id="navLogo" />
      <button id="mobileMenuButton" onClick={toggleMobileMenu}>
        ☰
      </button>
      <div className={`navLinks ${isMobileMenuOpen ? "active" : ""}`}>
        <Link to="/home">Home</Link>
        <Link to="/budget">Budget</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Nav;
