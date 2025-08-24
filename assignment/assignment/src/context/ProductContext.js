import React, { createContext, useState, useEffect, useContext } from "react";
import { API_CONFIG, PRODUCT_FIELD_MAP } from "../config";
import { transformProductList } from "../utils/dataTransformer";

export const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${API_CONFIG.BASE_URL}/${API_CONFIG.ENDPOINTS.PRODUCTS}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const rawData = await response.json();
        const transformedData = transformProductList(
          rawData,
          PRODUCT_FIELD_MAP
        );
        setProducts(transformedData);
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
