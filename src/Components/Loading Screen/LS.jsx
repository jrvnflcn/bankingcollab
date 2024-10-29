import React, { useEffect, useState } from "react";
import "./LS.css";
import fatuiLogo from "./assets/Fatui_Symbol.png";

const LoadingScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`container ${fadeOut ? "fade-out" : ""}`}>
      <div className="image-container">
        <img src={fatuiLogo} alt="Spinning" className="spinning-image" />
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingScreen;
