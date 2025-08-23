import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ThemeContext } from "../context/ThemeContext";

const AuthLayout = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div className="auth-layout">
      <div className="auth-header">
        <Link to="/home" className="auth-brand">
          DishDelight
        </Link>
        <Button
          variant={isDarkMode ? "outline-light" : "outline-dark"}
          onClick={toggleDarkMode}
          size="sm"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
