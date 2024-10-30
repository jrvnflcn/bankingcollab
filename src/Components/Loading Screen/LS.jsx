import React, { useEffect, useState } from "react";
import "./LS.css";
import fatuiLogo from "./assets/Fatui_Symbol.png";

const LoadingScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 5000);

    const fadeOutTimer = setTimeout(() => {
      if (fadeOut) {
        setIsVisible(false);
      }
    }, 500 + 300);
    return () => {
      clearTimeout(timer);
      clearTimeout(fadeOutTimer);
    };
  }, [fadeOut]);

  return (
    <div
      className={`LScontainer ${fadeOut ? "fade-out" : ""}`}
      style={{ display: isVisible ? "flex" : "none" }}
    >
      <div className="image-container">
        <img src={fatuiLogo} alt="Spinning" className="spinning-image" />
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingScreen;
