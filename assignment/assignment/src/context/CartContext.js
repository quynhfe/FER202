import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { AuthContext } from "./AuthContext";
import config from "../config";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, items: action.payload || [] };
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
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: Math.max(1, item.qty - 1) }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

const LOCAL_STORAGE_KEY = "temp_cart";

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const loadAndMergeCart = async () => {
      if (isAuthenticated && user) {
        try {
          const response = await fetch(
            `${config.dbUrl}/${config.collections.accounts}/${user.id}`
          );
          const userData = await response.json();
          const dbCart = userData.cart || [];

          const localCart = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
          );

          let finalCart = [...dbCart];

          if (localCart.length > 0) {
            localCart.forEach((localItem) => {
              const existingItem = finalCart.find(
                (dbItem) => dbItem.id === localItem.id
              );
              if (existingItem) {
                existingItem.qty += localItem.qty;
              } else {
                finalCart.push(localItem);
              }
            });

            await fetch(
              `${config.dbUrl}/${config.collections.accounts}/${user.id}`,
              {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cart: finalCart }),
              }
            );
            localStorage.removeItem(LOCAL_STORAGE_KEY);
          }

          dispatch({ type: "SET_CART", payload: finalCart });
        } catch (error) {
          console.error("Failed to load or merge cart:", error);
        }
      } else {
        const localCart = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
        );
        dispatch({ type: "SET_CART", payload: localCart });
      }
    };

    loadAndMergeCart();
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state.items));
    }
  }, [state.items, isAuthenticated]);

  const updateCartInDb = async (newCartItems) => {
    if (!isAuthenticated || !user) return;
    try {
      await fetch(`${config.dbUrl}/${config.collections.accounts}/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: newCartItems }),
      });
    } catch (err) {
      console.error("Failed to update cart in DB:", err);
    }
  };

  const dispatchAndPersist = (action) => {
    const newState = cartReducer(state, action);
    dispatch(action);
    if (isAuthenticated) {
      updateCartInDb(newState.items);
    }
  };

  const addToCart = (product) =>
    dispatchAndPersist({ type: "ADD_TO_CART", payload: product });
  const removeFromCart = (id) =>
    dispatchAndPersist({ type: "REMOVE_FROM_CART", payload: { id } });
  const incQty = (id) =>
    dispatchAndPersist({ type: "INC_QTY", payload: { id } });
  const decQty = (id) =>
    dispatchAndPersist({ type: "DEC_QTY", payload: { id } });
  const clearCart = () => dispatchAndPersist({ type: "CLEAR_CART" });

  const cartCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.qty, 0),
    [state.items]
  );
  // const subtotal = useMemo(
  //   () =>
  //     state.items
  //       .reduce(
  //         (sum, item) => sum + (item.salePrice || item.price) * item.qty,
  //         0
  //       )
  //       .toFixed(2),
  //   [state.items]
  // );
  const subtotal = useMemo(
    () =>
      state.items
        .reduce((sum, item) => {
          const priceAsNumber = Number(
            String(item.price).replace(/[^0-9.-]+/g, "")
          );
          return sum + (item.salePrice || priceAsNumber) * item.qty;
        }, 0)
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
