// routes/AppRoutes.jsx
import { Route, Routes, Navigate } from 'react-router-dom';
import ProductsPage from '../pages/ProductsPage';
import ProductDetails from '../pages/ProductDetails';
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';
import FavouritesPage from '../pages/FavouritesPage';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/favourites" element={<FavouritesPage />} />
        </Routes>
    );
}