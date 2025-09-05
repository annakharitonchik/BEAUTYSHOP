import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, duration = 2000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return <div className="Toast">{message}</div>;
};

export default Toast;
