import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_CONFIG } from "../config";
import { useToast } from "./ToastContext";

export const AuthContext = createContext();

const ACCOUNTS_API_URL = `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.ACCOUNTS}`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [redirectPath, setRedirectPath] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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
            (u.email === emailOrUsername || u.username === emailOrUsername) &&
            u.password === password
        );

        if (foundUser) {
          const userData = {
            id: foundUser.id,
            name: foundUser.fullName || foundUser.username,
            email: foundUser.email,
            avatar: foundUser.avatar,
          };
          setUser(userData);
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

        const emailExists = accounts.some((u) => u.email === data.email);
        if (emailExists) {
          return { success: false, message: "Email already exists." };
        }

        const usernameExists = accounts.some(
          (u) => u.username === data.username
        );
        if (usernameExists) {
          return { success: false, message: "Username already exists." };
        }

        const newUserPayload = {
          fullName: data.fullName,
          email: data.email,
          username: data.username,
          password: data.password,
          secretQuestion: data.secretQuestion,
          secretAnswer: data.secretAnswer,
          avatar: data.avatar,
        };

        const registerResponse = await fetch(ACCOUNTS_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUserPayload),
        });

        if (!registerResponse.ok) throw new Error("Registration failed.");
        const newUser = await registerResponse.json();

        const userData = {
          id: newUser.id,
          name: newUser.fullName,
          email: newUser.email,
          avatar: newUser.avatar,
        };
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData));
        navigate(redirectPath, { replace: true });
        return { success: true };
      } catch (error) {
        console.error("Registration error:", error);
        return { success: false, message: "An error occurred." };
      }
    },
    [navigate, redirectPath]
  );

  const updateUser = useCallback(
    async (userId, data) => {
      try {
        const updatePayload = {
          fullName: data.fullName,
          avatar: data.avatar,
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
          name: updatedUser.fullName,
          avatar: updatedUser.avatar,
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
    setUser(null);
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
