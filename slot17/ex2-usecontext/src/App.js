import React, { useContext, useState } from "react";
import { CartProvider } from "./context/CartContext";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { dishes } from "./data/data";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const filteredDishes = dishes.filter(
    (dish) =>
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CartProvider>
      <div className={`App ${isDarkMode ? "dark-mode" : ""}`}>
        <Navbar
          expand="lg"
          bg={isDarkMode ? "dark" : "light"}
          variant={isDarkMode ? "dark" : "light"}
          className="shadow-sm"
        >
          <Container fluid>
            <Navbar.Brand href="/">Food App</Navbar.Brand>
            <Nav className="ms-auto d-flex align-items-center">
              <Form className="d-flex me-2">
                <FormControl
                  type="search"
                  placeholder="Tìm kiếm món ăn..."
                  className="me-2"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form>
              <Button
                variant={isDarkMode ? "light" : "dark"}
                onClick={toggleDarkMode}
              >
                {isDarkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
              </Button>
            </Nav>
          </Container>
        </Navbar>

        <DishesList dishes={filteredDishes} />
        <Cart isDarkMode={isDarkMode} />
      </div>
    </CartProvider>
  );
}

export default App;
