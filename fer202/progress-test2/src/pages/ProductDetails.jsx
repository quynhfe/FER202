// pages/ProductDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert, Toast, ToastContainer, Badge } from 'react-bootstrap';
import { FaArrowLeft, FaCartPlus, FaHeart, FaCheck, FaMinus, FaPlus } from 'react-icons/fa';
import api from '../services/api';
import { formatPrice } from '../utils/format';
import AppNavbar from '../components/Navbar';
import { useApp } from '../contexts/AppContext.jsx';

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart, addToFavourites, isInCart, isInFavourites, cart, updateCartQuantity } = useApp();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    // Get current quantity in cart
    const cartItem = cart.find(item => item.id === parseInt(id));
    const currentCartQuantity = cartItem ? cartItem.quantity : 0;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError('');

                console.log('Fetching product with ID:', id);

                const { data } = await api.get(`/products/${id}`);

                console.log('Fetched product data:', data);

                if (data) {
                    // Normalize the product data
                    const normalizedProduct = {
                        id: data.id,
                        name: data.name || data.title,
                        title: data.title || data.name,
                        image: data.image || `https://picsum.photos/seed/${data.id}/600/400`,
                        price: data.price,
                        description: data.description,
                        category: data.category
                    };
                    setProduct(normalizedProduct);
                } else {
                    setError('Product not found');
                }
            } catch (error) {
                console.error('Failed to fetch product details:', error);
                setError('Failed to load product details. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const showNotification = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    const handleAddToCart = () => {
        if (!product) return;

        // Add multiple quantities
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        showNotification(`Added ${quantity} item(s) to cart!`);
    };

    const handleAddToFavourites = () => {
        if (!product) return;

        if (!isInFavourites(product.id)) {
            addToFavourites(product);
            showNotification('Added to favourites!');
        } else {
            showNotification('Product already in favourites!', 'info');
        }
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    if (loading) {
        return (
            <>
                <AppNavbar />
                <Container className="text-center py-5">
                    <Spinner animation="border" role="status" size="lg">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="mt-3">Loading product details...</p>
                </Container>
            </>
        );
    }

    if (error) {
        return (
            <>
                <AppNavbar />
                <Container className="py-5">
                    <Alert variant="danger" className="text-center">
                        <h4>Oops! Something went wrong</h4>
                        <p>{error}</p>
                        <Link to="/products" className="btn btn-primary">
                            <FaArrowLeft className="me-2" />
                            Back to Products
                        </Link>
                    </Alert>
                </Container>
            </>
        );
    }

    if (!product) {
        return (
            <>
                <AppNavbar />
                <Container className="py-5">
                    <Alert variant="warning" className="text-center">
                        <h4>Product Not Found</h4>
                        <p>The product you're looking for doesn't exist.</p>
                        <Link to="/products" className="btn btn-primary">
                            <FaArrowLeft className="me-2" />
                            Back to Products
                        </Link>
                    </Alert>
                </Container>
            </>
        );
    }

    return (
        <>
            <AppNavbar />
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Card className="shadow">
                            <Row className="g-0">
                                <Col md={6}>
                                    <Card.Img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            height: '100%',
                                            objectFit: 'cover',
                                            minHeight: '400px'
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Card.Body className="p-4">
                                        <div className="mb-3">
                                            <Badge bg="secondary" className="fs-6">
                                                {product.category}
                                            </Badge>
                                        </div>

                                        <Card.Title as="h2" className="mb-3">
                                            {product.name}
                                        </Card.Title>

                                        <h3 className="text-primary mb-4">
                                            {formatPrice(product.price)}
                                        </h3>

                                        <Card.Text className="mb-4" style={{ fontSize: '1.1em', lineHeight: '1.6' }}>
                                            {product.description}
                                        </Card.Text>

                                        {/* Quantity Selector */}
                                        <div className="mb-4">
                                            <label className="form-label">Quantity:</label>
                                            <div className="d-flex align-items-center">
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => handleQuantityChange(-1)}
                                                    disabled={quantity <= 1}
                                                >
                                                    <FaMinus />
                                                </Button>
                                                <span className="mx-3 fw-bold">{quantity}</span>
                                                <Button
                                                    variant="outline-secondary"
                                                    size="sm"
                                                    onClick={() => handleQuantityChange(1)}
                                                    disabled={quantity >= 10}
                                                >
                                                    <FaPlus />
                                                </Button>
                                            </div>
                                            {currentCartQuantity > 0 && (
                                                <small className="text-muted">
                                                    Currently in cart: {currentCartQuantity} item(s)
                                                </small>
                                            )}
                                        </div>

                                        <div className="d-grid gap-2 mb-4">
                                            <Button
                                                variant="success"
                                                size="lg"
                                                onClick={handleAddToCart}
                                            >
                                                {isInCart(product.id) ? (
                                                    <>
                                                        <FaCheck className="me-2" />
                                                        Add More to Cart
                                                    </>
                                                ) : (
                                                    <>
                                                        <FaCartPlus className="me-2" />
                                                        Add to Cart
                                                    </>
                                                )}
                                            </Button>
                                            <Button
                                                variant={isInFavourites(product.id) ? "danger" : "outline-danger"}
                                                size="lg"
                                                onClick={handleAddToFavourites}
                                            >
                                                <FaHeart className="me-2" />
                                                {isInFavourites(product.id) ? 'In Favourites' : 'Add to Favourites'}
                                            </Button>
                                        </div>

                                        <div className="mt-4 pt-3 border-top">
                                            <Link to="/products" className="btn btn-outline-secondary">
                                                <FaArrowLeft className="me-2" />
                                                Back to Products
                                            </Link>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <ToastContainer
                className="p-3"
                position="top-end"
                style={{ zIndex: 1050 }}
            >
                <Toast
                    show={showToast}
                    onClose={() => setShowToast(false)}
                    delay={3000}
                    autohide
                    bg={toastVariant}
                >
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body className={toastVariant === 'success' ? 'text-white' : ''}>
                        {toastMessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    );
};

export default ProductDetails;