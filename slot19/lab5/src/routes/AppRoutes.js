import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import DishDetailPage from "../pages/DishDetailPage";
import CartPage from "../pages/CartPage";
import FavouritesPage from "../pages/FavouritesPage";
import CheckoutPage from "../pages/CheckoutPage";
import DishesRequestForm from "../pages/DishesRequestForm";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="dishes/:id" element={<DishDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="checkout" element={<CheckoutPage />} />

        <Route path="request-dish" element={<DishesRequestForm />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
