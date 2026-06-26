import React, {  useRef,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Hero.css";
import ModalSecret from "../AdminAccess/ModalSecret";

const Hero = () => {
  const navigate = useNavigate();

const [showSecretModel,setShowSecretModel]=useState(false)

 const clickCount = useRef(0);
const timerRef = useRef(null);

const handleSecretClick = () => {
  clickCount.current++;

  clearTimeout(timerRef.current);

  timerRef.current = setTimeout(() => {
    clickCount.current = 0;
  }, 2000);

  if (clickCount.current >= 5) {
    clickCount.current = 0;
    setShowSecretModel(true) // later: setShowSecretModal(true)
  }
};

const verifySecret = async (code) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/admin/verify-secret",
      { code }
    );

    if (res.data.success) {
      navigate("/admin/login");
    }
  } catch (err) {
    console.log(err)
    alert("Invalid Secret Code");
  } finally {
    setShowSecretModel(false);
  }
};
  
  return (
    <div className="hero">
      <h3>Capturing Life Beautiful Moments</h3>

      <h1 onClick={handleSecretClick}>
        Harsh <span>Photography</span>
      </h1>

      <p>
        Where every frame tells a story, and every moment becomes eternal.
        <br />
        Professional photography that captures the essence of your precious
        <br />
        memories.
      </p>

      <Link to="/clientform">
        <button>BOOK A SESSION</button>
      </Link>
       <ModalSecret
    isOpen={showSecretModel}
    onClose={() => setShowSecretModel(false)}
    onVerify={verifySecret}
  />
    </div>
  );
};

export default Hero;