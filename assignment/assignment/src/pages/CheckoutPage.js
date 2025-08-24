import React, { useContext } from "react";
import { Container, Alert, Card, ListGroup, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const CheckoutPage = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const { cartState, subtotal, clearCart } = useContext(CartContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/login?redirect_uri=/checkout" replace />;
  }

  if (cartState.items.length === 0) {
    return (
      <Container className="my-5 text-center">
        <Alert variant="warning">
          Your cart is empty. Nothing to check out.
        </Alert>
      </Container>
    );
  }

  const handleConfirmOrder = () => {
    const order = {
      id: Date.now(),
      userId: user.id,
      items: cartState.items,
      total: subtotal,
      date: new Date().toISOString(),
    };

    console.log("Order Confirmed:", order);
    showToast("Order placed successfully!", "success");
    clearCart();
    navigate("/home");
  };

  return (
    <Container className="my-5" style={{ maxWidth: "800px" }}>
      <h1 className="text-center mb-4">Checkout</h1>
      <Card>
        <Card.Header as="h5">Order Summary</Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            {cartState.items.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between"
              >
                <span>
                  {item.title} (x{item.qty})
                </span>
                <span>
                  ${((item.salePrice || item.price) * item.qty).toFixed(2)}
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
