import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { dishes as initialDishes } from "../data/data"; // Lấy dữ liệu ban đầu từ file data.js

export const DishesContext = createContext();

export const DishesProvider = ({ children }) => {
  const [dishes, setDishes] = useState(initialDishes);

  // Hàm để thêm một món ăn mới vào danh sách (bộ nhớ tạm)
  const addDish = (newDish) => {
    // Thêm món ăn mới vào đầu danh sách để dễ thấy nhất
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
