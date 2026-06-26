import { useState } from "react";
import "./ModalSecret.css";

const ModalSecret = ({ isOpen, onClose, onVerify }) => {
  const [code, setCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onVerify(code);
    setCode("");
  };

  return (
    <div className="modal-overlay">
      <div className="secret-modal">
        <h2>Admin Access</h2>

        <input
          type="password"
          placeholder="Enter Secret Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <div className="buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default ModalSecret