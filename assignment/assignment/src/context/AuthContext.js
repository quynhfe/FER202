import React, { createContext, useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import config from "../config";
import { useToast } from "./ToastContext";

export const AuthContext = createContext();

const ACCOUNTS_API_URL = `${config.dbUrl}/${config.collections.accounts}`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [redirectPath, setRedirectPath] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Load user from session on initial render
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Track redirect path
  useEffect(() => {
    if (
      !["/login", "/register"].includes(location.pathname) &&
      location.pathname !== redirectPath
    ) {
      setRedirectPath(location.pathname);
    }
  }, [location.pathname, redirectPath]);

  const login = useCallback(
    async (emailOrUsername, password) => {
      try {
        const response = await fetch(ACCOUNTS_API_URL);
        if (!response.ok) throw new Error("Could not fetch accounts.");

        const accounts = await response.json();
        const foundUser = accounts.find(
          (u) =>
            (config.getField("userEmail", u) === emailOrUsername ||
              config.getField("userName", u) === emailOrUsername) &&
            config.getField("userPassword", u) === password
        );

        if (foundUser) {
          const userData = {
            id: config.getField("userId", foundUser),
            name:
              config.getField("userFullName", foundUser) ||
              config.getField("userName", foundUser),
            email: config.getField("userEmail", foundUser),
            avatar: config.getField("userAvatar", foundUser),
          };
          setUser(userData); // This change will trigger effects in CartContext and WishlistContext
          sessionStorage.setItem("user", JSON.stringify(userData));
          navigate(redirectPath, { replace: true });
          showToast("Login successful!", "success");
          return true;
        }
        return false;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },
    [navigate, redirectPath, showToast]
  );

  const register = useCallback(
    async (data) => {
      try {
        const response = await fetch(ACCOUNTS_API_URL);
        if (!response.ok) throw new Error("Could not fetch accounts.");
        const accounts = await response.json();

        const emailExists = accounts.some(
          (u) => config.getField("userEmail", u) === data.email
        );
        if (emailExists) {
          return { success: false, message: "Email already exists." };
        }

        const usernameExists = accounts.some(
          (u) => config.getField("userName", u) === data.username
        );
        if (usernameExists) {
          return { success: false, message: "Username already exists." };
        }

        const newUserPayload = {
          [config.fields.userFullName]: data.fullName,
          [config.fields.userEmail]: data.email,
          [config.fields.userName]: data.username,
          [config.fields.userPassword]: data.password,
          secretQuestion: data.secretQuestion,
          secretAnswer: data.secretAnswer,
          [config.fields.userAvatar]: data.avatar,
          wishlist: [], // Initialize with empty wishlist and cart
          cart: [],
        };

        const registerResponse = await fetch(ACCOUNTS_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUserPayload),
        });

        if (!registerResponse.ok) throw new Error("Registration failed.");

        navigate("/login");
        return { success: true };
      } catch (error) {
        console.error("Registration error:", error);
        return {
          success: false,
          message: "An error occurred during registration.",
        };
      }
    },
    [navigate]
  );

  const updateUser = useCallback(
    async (userId, data) => {
      // ... (updateUser logic remains the same)
      try {
        const updatePayload = {
          [config.fields.userFullName]: data.fullName,
          [config.fields.userAvatar]: data.avatar,
        };

        const response = await fetch(`${ACCOUNTS_API_URL}/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatePayload),
        });

        if (!response.ok) throw new Error("Update failed.");

        const updatedUser = await response.json();

        const updatedUserData = {
          ...user,
          name: config.getField("userFullName", updatedUser),
          avatar: config.getField("userAvatar", updatedUser),
        };
        setUser(updatedUserData);
        sessionStorage.setItem("user", JSON.stringify(updatedUserData));
        return true;
      } catch (error) {
        console.error("Update error:", error);
        return false;
      }
    },
    [user]
  );

  const logout = useCallback(() => {
    setUser(null); // This change will trigger effects in CartContext and WishlistContext
    sessionStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  const isAuthenticated = !!user;

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    updateUser,
    setRedirectPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
