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
import DishesRequestForm from "../pages/DishesRequestForm"; // 1. Import trang mới

function AppRoutes() {
  return (
    <Routes>
      {/* Routes cho trang Đăng nhập / Đăng ký */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Routes cho các trang chính của ứng dụng */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="dishes/:id" element={<DishDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="checkout" element={<CheckoutPage />} />

        {/* 2. Thêm route mới cho trang yêu cầu món ăn */}
        <Route path="request-dish" element={<DishesRequestForm />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
