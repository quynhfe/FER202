import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import ToastNotifications from "../components/ToastNotifications";
import Footer from "../components/Footer"; // Import Footer

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarComponent />
      <ToastNotifications />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
