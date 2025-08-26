// src/layouts/Header.js

import React, { useContext, useState } from "react";
import {
  Nav,
  Navbar,
  Container,
  FormCheck,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import {
  FaMoon,
  FaSun,
  FaShoppingCart,
  FaHeart,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import config from "../config";

function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { wishlistCount } = useContext(WishlistContext);
  const { cartCount } = useContext(CartContext);

  const [isOpen, setIsOpen] = useState(false);

  const userAvatar = user ? config.getField("userAvatar", user) : null;
  const userFullName = user
    ? config.getField("userFullName", user) ||
      config.getField("userName", user) ||
      user.name ||
      "User"
    : "User";

  const userTitle = (
    <div className="d-flex align-items-center">
      {userAvatar ? (
        <img
          src={userAvatar}
          alt={userFullName}
          className="rounded-circle me-2"
          style={{ width: "30px", height: "30px", objectFit: "cover" }}
        />
      ) : (
        <FaUserCircle size="24px" className="me-2" />
      )}
      <span>{userFullName}</span>
      {isOpen ? (
        <FaChevronUp size="0.7em" className="ms-2" />
      ) : (
        <FaChevronDown size="0.7em" className="ms-2" />
      )}
    </div>
  );

  return (
    <Navbar expand="lg" className="header-navbar" fixed="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/home"
          className="d-flex align-items-center"
        >
          <img src="/images/logo.jpg" alt="Shop Logo" className="logo" />
          <span className="fw-bold fs-4 brand-title">E-Shop</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={NavLink} to="/home" className="styled-nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products" className="styled-nav-link">
              Products
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3 nav-actions">
            {/* dark mode */}
            <div className="dark-mode-toggle">
              <FormCheck
                type="switch"
                id="dark-mode-switch"
                label={
                  isDarkMode ? (
                    <FaMoon color="yellow" />
                  ) : (
                    <FaSun color="orange" />
                  )
                }
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
            </div>

            {/* wishlist */}
            <Nav.Link
              as={Link}
              to="/wishlist"
              className="position-relative text-secondary"
            >
              <FaHeart size="1.4em" />
              {wishlistCount > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {wishlistCount}
                </Badge>
              )}
            </Nav.Link>

            {/* cart */}
            <Nav.Link
              as={Link}
              to="/cart"
              className="position-relative text-secondary"
            >
              <FaShoppingCart size="1.4em" />
              {cartCount > 0 && (
                <Badge
                  pill
                  bg="success"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {/* user */}
            {isAuthenticated ? (
              <NavDropdown
                title={userTitle}
                id="user-dropdown"
                align="end"
                show={isOpen}
                onToggle={(open) => setIsOpen(open)}
              >
                <NavDropdown.Item as={Link} to="/account">
                  My Account
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/wishlist">
                  My Wishlist
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
                  <FaSignOutAlt className="me-2" /> Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login" className="btn header-signin-btn ms-2">
                Sign In
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
