import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
const Hero = () => {
  return (
    <div className="hero">
      <h3>Capturing Life Beautiful Moments</h3>{" "}
      <h1>
        Harsh <span> Photography</span>
      </h1>
      <p>
        Where every frame tells a story , and every moments become eternal . <br />
        Professional photography that captures the essence of your precious <br />
        memories
      </p>
    <Link to="/clientform">
      <button>BOOK A SESSION</button>
    </Link>
    </div>
  );
};

export default Hero;
