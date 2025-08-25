// src/context/ProductContext.js

import React, { createContext, useState, useEffect, useContext } from "react";
import config from "../config"; // Sửa import

export const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Sửa cách tạo URL
        const response = await fetch(
          `${config.dbUrl}/${config.collections.products}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const rawData = await response.json();
        // Không cần transform data ở đây nữa
        setProducts(rawData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const value = { products, loading, error };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
