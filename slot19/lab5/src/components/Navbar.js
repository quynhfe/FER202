import React, { useContext } from "react";
import { Navbar, Container, Nav, Button, NavDropdown } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { FavouritesContext } from "../context/FavouritesContext";
import {
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

const NavbarComponent = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { cartState } = useContext(CartContext);
  const { favouritesState } = useContext(FavouritesContext);
  const navigate = useNavigate();

  const cartItemCount = cartState.items.length;
  const favouriteItemCount = favouritesState.items.length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      bg="light" // Luôn là "light" để CSS dark mode có thể ghi đè
      variant={isDarkMode ? "dark" : "light"}
      className="shadow-sm sticky-top pt-3 pb-3" // Bỏ mt-2 mb-3
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/home" className="fw-bold">
          DishDelight
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/request-dish">
              Dishes Request Form
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/cart" className="position-relative me-2">
              <FaShoppingCart size="1.2em" />
              {cartItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                  {cartItemCount}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/favourites"
              className="position-relative me-3"
            >
              <FaHeart size="1.2em" />
              {favouriteItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {favouriteItemCount}
                  <span className="visually-hidden">favourite items</span>
                </span>
              )}
            </Nav.Link>

            {isAuthenticated ? (
              <NavDropdown
                title={<FaUserCircle size="1.5em" />}
                id="basic-nav-dropdown"
                align="end"
              >
                <NavDropdown.Header>Welcome, {user.name}!</NavDropdown.Header>
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  <FaSignInAlt className="me-1" /> Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  <FaUserPlus className="me-1" /> Register
                </Nav.Link>
              </>
            )}

            <Button
              variant={isDarkMode ? "outline-light" : "outline-dark"}
              onClick={toggleDarkMode}
              className="ms-3 d-flex align-items-center"
              size="sm"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
