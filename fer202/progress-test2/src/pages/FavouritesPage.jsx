// pages/FavouritesPage.jsx
import React from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';
import { FaHeart, FaTrash, FaCartPlus, FaEye, FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AppNavbar from '../components/Navbar';
import { useApp } from '../contexts/AppContext';
import { formatPrice } from '../utils/format';

const FavouritesPage = () => {
    const navigate = useNavigate();
    const {
        favourites,
        removeFromFavourites,
        addToCart,
        isInCart,
        getFavouritesCount
    } = useApp();

    const handleRemoveFromFavourites = (productId) => {
        if (window.confirm('Remove this item from favourites?')) {
            removeFromFavourites(productId);
        }
    };

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleViewDetails = (productId) => {
        navigate(`/products/${productId}`);
    };

    if (favourites.length === 0) {
        return (
            <>
                <AppNavbar />
                <Container className="py-5">
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Alert variant="info" className="text-center">
                                <FaHeart size={48} className="mb-3 text-danger" />
                                <h4>No favourites yet</h4>
                                <p>Start browsing and add products you love to your favourites.</p>
                                <Link to="/products" className="btn btn-primary">
                                    <FaArrowLeft className="me-2" />
                                    Browse Products
                                </Link>
                            </Alert>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }

    return (
        <>
            <AppNavbar />
            <Container className="py-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>My Favourites</h1>
                    <Badge bg="danger" className="fs-6">
                        <FaHeart className="me-1" />
                        {getFavouritesCount()} item(s)
                    </Badge>
                </div>

                <Row className="g-4">
                    {favourites.map(product => (
                        <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                            <Card className="h-100 shadow-sm">
                                <div className="position-relative">
                                    <Card.Img
                                        variant="top"
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            height: '200px',
                                            objectFit: 'cover',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleViewDetails(product.id)}
                                    />
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        className="position-absolute top-0 end-0 m-2"
                                        onClick={() => handleRemoveFromFavourites(product.id)}
                                        title="Remove from favourites"
                                        style={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            border: '1px solid #dc3545'
                                        }}
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>

                                <Card.Body className="d-flex flex-column">
                                    <div className="mb-2">
                                        <Badge bg="secondary" className="mb-2">
                                            {product.category}
                                        </Badge>
                                    </div>

                                    <Card.Title
                                        className="h6 mb-2 cursor-pointer"
                                        onClick={() => handleViewDetails(product.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {product.name}
                                    </Card.Title>

                                    <Card.Text className="flex-grow-1 small text-muted mb-2">
                                        {product.description}
                                    </Card.Text>

                                    <div className="mb-3">
                                        <Badge bg="primary" className="fs-6">
                                            {formatPrice(product.price)}
                                        </Badge>
                                    </div>

                                    <div className="d-grid gap-2">
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => handleViewDetails(product.id)}
                                        >
                                            <FaEye className="me-1" />
                                            View Details
                                        </Button>

                                        <Button
                                            variant={isInCart(product.id) ? "success" : "outline-success"}
                                            size="sm"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            <FaCartPlus className="me-1" />
                                            {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div className="mt-4">
                    <Link to="/products" className="btn btn-outline-secondary">
                        <FaArrowLeft className="me-2" />
                        Continue Shopping
                    </Link>
                </div>
            </Container>
        </>
    );
};

export default FavouritesPage;