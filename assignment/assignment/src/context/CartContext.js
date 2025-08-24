import React, { createContext, useReducer, useEffect, useMemo } from "react";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const itemInCart = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "INC_QTY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    case "DEC_QTY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: Math.max(1, item.qty - 1) }
              : item
          )
          .filter((item) => item.qty > 0),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "LOAD_CART":
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(storedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  const incQty = (id) => dispatch({ type: "INC_QTY", payload: { id } });
  const decQty = (id) => dispatch({ type: "DEC_QTY", payload: { id } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const cartCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.qty, 0),
    [state.items]
  );
  const subtotal = useMemo(
    () =>
      state.items
        .reduce(
          (sum, item) => sum + (item.salePrice || item.price) * item.qty,
          0
        )
        .toFixed(2),
    [state.items]
  );

  const value = {
    cartState: state,
    addToCart,
    removeFromCart,
    incQty,
    decQty,
    clearCart,
    cartCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
