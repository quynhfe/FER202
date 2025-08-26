// src/layouts/AuthLayout.js

import React from "react";
import { Outlet, Link } from "react-router-dom";
import { FormCheck } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";
import { FaMoon, FaSun, FaArrowLeft } from "react-icons/fa";
import ToastNotifications from "../components/ToastNotifications"; // MODIFICATION: Import ToastNotifications

const AuthLayout = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <div className="auth-layout">
      <header className="auth-header">
        <Link to="/home" className="auth-back-link">
          <FaArrowLeft className="me-2" /> Back to Shop
        </Link>
        <div className="dark-mode-toggle">
          <FormCheck
            type="switch"
            id="auth-dark-mode-switch"
            label={
              isDarkMode ? <FaMoon color="yellow" /> : <FaSun color="orange" />
            }
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
        </div>
      </header>
      <main className="auth-container">
        <Outlet />
      </main>
      <ToastNotifications /> {/* MODIFICATION: Add component here */}
    </div>
  );
};

export default AuthLayout;
