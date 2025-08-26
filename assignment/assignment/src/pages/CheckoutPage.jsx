// src/pages/CheckoutPage.js

import React, { useContext, useState } from "react";
import { Container, Alert, Card, ListGroup, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import config from "../config";

const CheckoutPage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { cartState, subtotal, clearCart } = useContext(CartContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login?redirect_uri=/checkout" replace />;
  }

  const handleConfirmOrder = () => {
    const order = {
      id: Date.now(),
      userId: config.getField("userId", user),
      items: cartState.items,
      total: subtotal,
      date: new Date().toISOString(),
    };

    console.log("Order Confirmed:", order);
    showToast("Order placed successfully!", "success");
    clearCart();
    setIsOrderConfirmed(true);
  };

  if (isOrderConfirmed) {
    return (
      <Container className="my-5 text-center" style={{ maxWidth: "800px" }}>
        {/* MODIFICATION: Changed variant to a custom className */}
        <Alert className="p-4 alert-custom-primary">
          <Alert.Heading>Payment Successful!</Alert.Heading>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          <hr />
          {/* MODIFICATION: Changed button variant */}
          <Button variant="primary" onClick={() => navigate("/home")}>
            Continue Shopping
          </Button>
        </Alert>
      </Container>
    );
  }

  if (cartState.items.length === 0) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="warning">
          Your cart is empty. There is nothing to check out.
        </Alert>
        <Button variant="primary" onClick={() => navigate("/products")}>
          Start Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: "800px" }}>
      <h1 className="text-center mb-4">Checkout</h1>
      <Card>
        <Card.Header as="h5">Order Summary</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {cartState.items.map((item) => (
              <ListGroup.Item
                key={config.getField("productId", item)}
                className="d-flex justify-content-between"
              >
                <span>
                  {config.getField("productTitle", item)} (x{item.qty})
                </span>
                <span>
                  $
                  {(
                    (config.getField("productSalePrice", item) ||
                      config.getField("productPrice", item)) * item.qty
                  ).toFixed(2)}
                </span>
              </ListGroup.Item>
            ))}
            <ListGroup.Item className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>${subtotal}</span>
            </ListGroup.Item>
          </ListGroup>
          <div className="d-grid mt-4">
            <Button variant="primary" size="lg" onClick={handleConfirmOrder}>
              Confirm Order
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CheckoutPage;
