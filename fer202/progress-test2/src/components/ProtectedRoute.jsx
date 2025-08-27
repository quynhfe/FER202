// components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext.jsx';

const ProtectedRoute = ({ children, requireAuth = true }) => {
    const { isAuthenticated } = useApp();

    if (requireAuth && !isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!requireAuth && isAuthenticated) {
        return <Navigate to="/products" replace />;
    }

    return children;
};

export default ProtectedRoute;