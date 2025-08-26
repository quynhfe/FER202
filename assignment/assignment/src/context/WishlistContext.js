import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import config from "../config";

export const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return { items: action.payload || [] };
    case "TOGGLE_WISHLIST": {
      const itemExists = state.items.find(
        (item) =>
          config.getField("productId", item) ===
          config.getField("productId", action.payload)
      );
      if (itemExists) {
        return {
          ...state,
          items: state.items.filter(
            (item) =>
              config.getField("productId", item) !==
              config.getField("productId", action.payload)
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "CLEAR_WISHLIST":
      return { items: [] };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });
  const { user, isAuthenticated } = useContext(AuthContext);

  // Load wishlist from DB when user logs in
  useEffect(() => {
    const loadWishlist = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch(
            `${config.dbUrl}/${config.collections.accounts}/${user.id}`
          );
          const userData = await response.json();
          dispatch({ type: "SET_WISHLIST", payload: userData.wishlist || [] });
        } catch (error) {
          console.error("Failed to load wishlist:", error);
        }
      } else {
        // Clear wishlist on logout
        dispatch({ type: "CLEAR_WISHLIST" });
      }
    };
    loadWishlist();
  }, [isAuthenticated, user]);

  // Function to update wishlist in the database
  const updateWishlistInDb = async (newWishlist) => {
    if (!isAuthenticated || !user) return;
    try {
      await fetch(`${config.dbUrl}/${config.collections.accounts}/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlist: newWishlist }),
      });
    } catch (error) {
      console.error("Failed to update wishlist in DB:", error);
    }
  };

  const toggleWishlist = (product) => {
    // Optimistically update the UI first
    dispatch({ type: "TOGGLE_WISHLIST", payload: product });

    // Then, persist the change to the DB
    const itemExists = state.items.find(
      (item) =>
        config.getField("productId", item) ===
        config.getField("productId", product)
    );
    let newWishlist;
    if (itemExists) {
      newWishlist = state.items.filter(
        (item) =>
          config.getField("productId", item) !==
          config.getField("productId", product)
      );
    } else {
      newWishlist = [...state.items, product];
    }
    updateWishlistInDb(newWishlist);
  };

  const isWished = (productId) =>
    state.items.some(
      (item) => config.getField("productId", item) === productId
    );

  const wishlistCount = state.items.length;

  const value = {
    wishlistState: state,
    toggleWishlist,
    isWished,
    wishlistCount,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
