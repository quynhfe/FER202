// contexts/AppContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  cart: [],
  favourites: [],
  isAuthenticated: false
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        cart: [],
        favourites: []
      };

    case 'ADD_TO_CART':
      {
        const existingCartItem = state.cart.find(item => item.id === action.payload.id);
        if (existingCartItem) {
          return {
            ...state,
            cart: state.cart.map(item =>
              item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'ADD_TO_FAVOURITES':
      if (state.favourites.find(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favourites: [...state.favourites, action.payload]
      };

    case 'REMOVE_FROM_FAVOURITES':
      return {
        ...state,
        favourites: state.favourites.filter(item => item.id !== action.payload)
      };

    case 'LOAD_PERSISTED_DATA':
      return {
        ...state,
        cart: action.payload.cart || [],
        favourites: action.payload.favourites || []
      };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load persisted data on mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    const cartData = localStorage.getItem('cart');
    const favouritesData = localStorage.getItem('favourites');

    if (userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('user');
      }
    }

    if (cartData || favouritesData) {
      try {
        dispatch({
          type: 'LOAD_PERSISTED_DATA',
          payload: {
            cart: cartData ? JSON.parse(cartData) : [],
            favourites: favouritesData ? JSON.parse(favouritesData) : []
          }
        });
      } catch (e) {
        console.error('Error parsing persisted data:', e);
        localStorage.removeItem('cart');
        localStorage.removeItem('favourites');
      }
    }
  }, []);

  // Persist cart and favourites to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(state.favourites));
  }, [state.favourites]);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch({ type: 'SET_USER', payload: userData });
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateCartQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const addToFavourites = (product) => {
    dispatch({ type: 'ADD_TO_FAVOURITES', payload: product });
  };

  const removeFromFavourites = (productId) => {
    dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: productId });
  };

  const value = {
    ...state,
    login,
    logout,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addToFavourites,
    removeFromFavourites,
    getCartItemsCount: () => state.cart.reduce((total, item) => total + item.quantity, 0),
    getCartTotal: () => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    getFavouritesCount: () => state.favourites.length,
    isInCart: (productId) => state.cart.some(item => item.id === productId),
    isInFavourites: (productId) => state.favourites.some(item => item.id === productId)
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};