import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Spinner({ path = "login" }) {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    count === 0 && navigate(`${path}`, { state: location.pathname });

    return () => {
      clearInterval(interval);
    };
  }, [count, navigate, location, path]);
  return (
    <>
      <h1>Redirecting to Login {count}</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );
}
