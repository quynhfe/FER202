// src/components/ToastNotifications.js
import React, { useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";
import { ThemeContext } from "../context/ThemeContext";

const ToastNotifications = () => {
  const { toasts, hideToast } = useContext(ToastContext);
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <ToastContainer
      position="top-end"
      className="p-3 custom-toast-container position-fixed "
      style={{ zIndex: 9999 }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          onClose={() => hideToast(toast.id)}
          show={true}
          delay={3000}
          autohide
          bg={isDarkMode ? "dark" : toast.variant}
          className={isDarkMode ? "text-white" : ""}
        >
          <Toast.Header
            closeButton={!isDarkMode}
            closeVariant={isDarkMode ? "white" : undefined}
          >
            <strong className="me-auto">
              {toast.variant === "success" && "✅ Success"}
              {toast.variant === "info" && "ℹ️ Notification"}
              {toast.variant === "danger" && "❌ Error"}
              {toast.variant === "warning" && "⚠️ Warning"}
            </strong>
          </Toast.Header>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default ToastNotifications;
