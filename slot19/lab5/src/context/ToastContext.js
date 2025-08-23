// src/context/ToastContext.js
import React, { createContext, useReducer } from "react";

export const ToastContext = createContext();

const toastReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return [...state, { id: Date.now(), ...action.payload }];
    case "HIDE_TOAST":
      return state.filter((toast) => toast.id !== action.payload.id);
    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const showToast = (message, variant = "success") => {
    dispatch({ type: "SHOW_TOAST", payload: { message, variant } });
  };

  const hideToast = (id) => dispatch({ type: "HIDE_TOAST", payload: { id } });

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};
