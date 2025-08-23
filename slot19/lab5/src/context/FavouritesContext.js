import React, { createContext, useReducer, useEffect } from "react";

export const FavouritesContext = createContext();

const favouritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVOURITE":
      if (state.items.some((item) => item.id === action.payload.id)) {
        return state;
      }
      return { ...state, items: [...state.items, action.payload] };
    case "REMOVE_FAVOURITE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "LOAD_FAVOURITES":
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

const initialState = {
  items: [],
};

export const FavouritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouritesReducer, initialState);

  useEffect(() => {
    const savedFavourites = localStorage.getItem("favourites");
    if (savedFavourites) {
      dispatch({
        type: "LOAD_FAVOURITES",
        payload: JSON.parse(savedFavourites),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(state.items));
  }, [state.items]);

  const addFavourite = (dish) =>
    dispatch({ type: "ADD_FAVOURITE", payload: dish });

  const removeFavourite = (id) =>
    dispatch({ type: "REMOVE_FAVOURITE", payload: { id } });

  const isFavourite = (id) => state.items.some((item) => item.id === id);

  return (
    <FavouritesContext.Provider
      value={{
        favouritesState: state,
        addFavourite,
        removeFavourite,
        isFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
