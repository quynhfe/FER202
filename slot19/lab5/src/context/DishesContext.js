import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { dishes as initialDishes } from "../data/data";

export const DishesContext = createContext();

export const DishesProvider = ({ children }) => {
  const [dishes, setDishes] = useState(initialDishes);

  const addDish = (newDish) => {
    setDishes((prevDishes) => [newDish, ...prevDishes]);
  };

  return (
    <DishesContext.Provider value={{ dishes, addDish }}>
      {children}
    </DishesContext.Provider>
  );
};

DishesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
