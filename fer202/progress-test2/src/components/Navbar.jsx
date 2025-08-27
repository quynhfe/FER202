// components/Navbar.jsx
import React from 'react';
import { Navbar, Container, Nav, Badge, Dropdown } from 'react-bootstrap';
import { FaShoppingCart, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext.jsx';

const AppNavbar = () => {
    const {
        isAuthenticated,
        user,
        logout,
        getCartItemsCount,
        getFavouritesCount
    } = useApp();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/products');
    };

    return (
        <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/products" className="fw-bold">
                    MyShop
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/products">
                            Products
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto d-flex align-items-center">
                        <Nav.Link as={Link} to="/favourites" className="d-flex align-items-center me-3">
                            <FaHeart className="me-1" />
                            <span>Favourites</span>
                            <Badge bg="danger" className="ms-1">{getFavouritesCount()}</Badge>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/cart" className="d-flex align-items-center me-3">
                            <FaShoppingCart className="me-1" />
                            <span>Cart</span>
                            <Badge bg="success" className="ms-1">{getCartItemsCount()}</Badge>
                        </Nav.Link>

                        {isAuthenticated ? (
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="outline-primary"
                                    id="user-dropdown"
                                    className="d-flex align-items-center border-0"
                                    style={{ background: 'none' }}
                                >
                                    <FaUser className="me-1" />
                                    <span>{user?.email || 'User'}</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu align="end">
                                    <Dropdown.Item onClick={handleLogout}>
                                        <FaSignOutAlt className="me-2" />
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
                                <FaUser className="me-1" />
                                <span>Login</span>
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;