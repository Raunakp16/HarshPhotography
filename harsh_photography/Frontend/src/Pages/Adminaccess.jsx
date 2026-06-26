import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Adminaccess = () => {
  console.log("Adminaccess mounted");
  const navigate = useNavigate();
  useEffect(() => {
    const handlekeyDown = (e) => {
      console.log({
        key: e.key,
        ctrl: e.ctrlKey,
        alt: e.altKey,
      });
      if (e.ctrlKey && e.altKey && e.code === "KeyH") {
        e.preventDefault();
        console.log("shortcut detected ");
        navigate("/admin/login");
      }
    };
    window.addEventListener("keydown", handlekeyDown);

    return () => {
      window.removeEventListener("keydown", handlekeyDown);
    };
  }, [navigate]);
  return null;
};

export default Adminaccess;
