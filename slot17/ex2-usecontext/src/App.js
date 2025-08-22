import React, { useState } from "react";
import { CartProvider } from "./context/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { dishes } from "./data/data";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CartProvider>
      <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Food App
            </a>
            <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm món ăn..."
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className={`btn ${isDarkMode ? "btn-light" : "btn-dark"}`}
                onClick={toggleDarkMode}
              >
                {isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
              </button>
            </div>
          </div>
        </nav>
        <DishesList dishes={filteredDishes} />
        <Cart isDarkMode={isDarkMode} />
      </div>
    </CartProvider>
  );
}

export default App;
