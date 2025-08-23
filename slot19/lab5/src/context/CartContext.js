import React, { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { items } = state;
      const { payload: dishToAdd } = action;
      const existingItem = items.find((item) => item.id === dishToAdd.id);

      if (existingItem) {
        return {
          ...state,
          items: items.map((item) =>
            item.id === dishToAdd.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...items, { ...dishToAdd, quantity: 1 }],
        };
      }
    }

    case "DECREASE_QUANTITY": {
      const { items } = state;
      const { payload: dishToDecrease } = action;
      const existingItem = items.find((item) => item.id === dishToDecrease.id);

      if (existingItem && existingItem.quantity > 1) {
        return {
          ...state,
          items: items.map((item) =>
            item.id === dishToDecrease.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: items.filter((item) => item.id !== dishToDecrease.id),
        };
      }
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "LOAD_CART":
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

const initialState = {
  items: [],
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (dish) => dispatch({ type: "ADD_TO_CART", payload: dish });
  const decreaseQuantity = (dish) =>
    dispatch({ type: "DECREASE_QUANTITY", payload: dish });
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalValue = state.items
    .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartState: state,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        totalValue,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
