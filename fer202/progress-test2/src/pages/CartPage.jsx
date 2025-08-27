// pages/CartPage.jsx
import React from 'react';
import { Container, Row, Col, Card, Button, Table, Badge, Alert } from 'react-bootstrap';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AppNavbar from '../components/Navbar';
import { useApp } from '../contexts/AppContext.jsx';
import { formatPrice } from '../utils/format';

const CartPage = () => {
    const {
        cart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount
    } = useApp();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartQuantity(productId, newQuantity);
        }
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            clearCart();
        }
    };

    if (cart.length === 0) {
        return (
            <>
                <AppNavbar />
                <Container className="py-5">
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <Alert variant="info" className="text-center">
                                <FaShoppingBag size={48} className="mb-3" />
                                <h4>Your cart is empty</h4>
                                <p>Start shopping to add items to your cart.</p>
                                <Link to="/products" className="btn btn-primary">
                                    <FaArrowLeft className="me-2" />
                                    Continue Shopping
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
                <Row>
                    <Col md={12}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1>Shopping Cart</h1>
                            <Badge bg="primary" className="fs-6">
                                {getCartItemsCount()} item(s)
                            </Badge>
                        </div>

                        <Card className="shadow">
                            <Card.Body className="p-0">
                                <Table responsive className="mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Subtotal</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            style={{
                                                                width: '60px',
                                                                height: '60px',
                                                                objectFit: 'cover',
                                                                borderRadius: '8px'
                                                            }}
                                                            className="me-3"
                                                        />
                                                        <div>
                                                            <h6 className="mb-1">
                                                                <Link
                                                                    to={`/products/${item.id}`}
                                                                    className="text-decoration-none"
                                                                >
                                                                    {item.name}
                                                                </Link>
                                                            </h6>
                                                            <small className="text-muted">
                                                                {item.category}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <strong>{formatPrice(item.price)}</strong>
                                                </td>
                                                <td className="align-middle">
                                                    <div className="d-flex align-items-center">
                                                        <Button
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        >
                                                            <FaMinus />
                                                        </Button>
                                                        <span className="mx-3 fw-bold">
                                                            {item.quantity}
                                                        </span>
                                                        <Button
                                                            variant="outline-secondary"
                                                            size="sm"
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        >
                                                            <FaPlus />
                                                        </Button>
                                                    </div>
                                                </td>
                                                <td className="align-middle">
                                                    <strong className="text-primary">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </strong>
                                                </td>
                                                <td className="align-middle">
                                                    <Button
                                                        variant="outline-danger"
                                                        size="sm"
                                                        onClick={() => removeFromCart(item.id)}
                                                        title="Remove from cart"
                                                    >
                                                        <FaTrash />
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>

                        <Row className="mt-4">
                            <Col md={8}>
                                <div className="d-flex gap-2">
                                    <Link to="/products" className="btn btn-outline-secondary">
                                        <FaArrowLeft className="me-2" />
                                        Continue Shopping
                                    </Link>
                                    <Button
                                        variant="outline-warning"
                                        onClick={handleClearCart}
                                    >
                                        Clear Cart
                                    </Button>
                                </div>
                            </Col>
                            <Col md={4}>
                                <Card className="bg-light">
                                    <Card.Body>
                                        <h5>Order Summary</h5>
                                        <hr />
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Items ({getCartItemsCount()}):</span>
                                            <span>{formatPrice(getCartTotal())}</span>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <span>Shipping:</span>
                                            <span className="text-success">Free</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between mb-3">
                                            <strong>Total:</strong>
                                            <strong className="text-primary fs-4">
                                                {formatPrice(getCartTotal())}
                                            </strong>
                                        </div>
                                        <Button
                                            variant="success"
                                            size="lg"
                                            className="w-100"
                                            onClick={() => alert('Checkout functionality coming soon!')}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CartPage;