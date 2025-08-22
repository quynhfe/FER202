import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  Card,
  Button,
  ListGroup,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import {
  FaTrash,
  FaShoppingBag,
  FaCreditCard,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import LoginConfirmationModal from "./LoginConfirmationModal";

const Cart = () => {
  const {
    cartState,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalValue,
    totalItems,
  } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate("/checkout");
    } else {
      setShowLoginModal(true);
    }
  };

  const handleConfirmLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  return (
    <>
      <Container className="my-5">
        <h1 className="text-center mb-4">Your Shopping Cart</h1>
        {cartState.items.length === 0 ? (
          <Alert variant="info" className="text-center p-4">
            <h4>Your cart is empty.</h4>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/home" className="btn btn-primary">
              Start Shopping
            </Link>
          </Alert>
        ) : (
          <Card className="shadow-lg border-0">
            <ListGroup variant="flush">
              {cartState.items.map((item) => (
                <ListGroup.Item key={item.id} className="p-3">
                  <Row className="align-items-center">
                    <Col xs={2} md={1} className="text-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        width="60"
                        className="rounded"
                      />
                    </Col>
                    <Col xs={5} md={6}>
                      <strong className="d-block">{item.name}</strong>
                      <span className="text-muted">
                        ${parseFloat(item.price).toFixed(2)}
                      </span>
                    </Col>
                    <Col
                      xs={3}
                      md={3}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => decreaseQuantity(item)}
                      >
                        <FaMinus />
                      </Button>
                      <strong className="mx-3">{item.quantity}</strong>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => addToCart(item)}
                      >
                        <FaPlus />
                      </Button>
                    </Col>
                    <Col xs={2} md={2} className="text-end">
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove item"
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card.Body className="p-4">
              <div className="text-end mb-3">
                <h5>
                  Total Items: <strong>{totalItems}</strong>
                </h5>
                <h4 className="fw-bold">
                  Grand Total:{" "}
                  <span className="text-primary">${totalValue}</span>
                </h4>
              </div>
              <div className="d-flex justify-content-between">
                <Link to="/home" className="btn btn-outline-secondary">
                  <FaShoppingBag className="me-2" /> Continue Shopping
                </Link>
                <div>
                  <Button variant="danger" className="me-2" onClick={clearCart}>
                    Clear Cart
                  </Button>
                  <Button variant="success" onClick={handleCheckout}>
                    <FaCreditCard className="me-2" /> Proceed to Checkout
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>

      <LoginConfirmationModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onConfirm={handleConfirmLogin}
      />
    </>
  );
};

export default Cart;
