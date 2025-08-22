import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Card, Button, ListGroup, Alert } from "react-bootstrap";
import CartModals from "./CartModals"; // Import component mới

const Cart = ({ isDarkMode }) => {
  const { cartItems, removeFromCart, clearCart, totalValue } =
    useContext(CartContext);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCheckout = () => {
    setShowConfirm(true);
  };

  const handleConfirmPayment = () => {
    setShowConfirm(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      clearCart();
    }, 2000);
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">🛒 Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <Alert variant="info" className="text-center">
          Giỏ hàng của bạn đang trống.
        </Alert>
      ) : (
        <Card className="shadow-sm">
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.name}</strong> <br />
                  <span className="text-muted">
                    ${parseFloat(item.price).toFixed(2)}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Card.Body className="text-end">
            <p className="mb-1">
              Tổng số món: <strong>{cartItems.length}</strong>
            </p>
            <p className="mb-3">
              Tổng giá trị: <strong>${totalValue}</strong>
            </p>
            <Button variant="danger" className="me-2" onClick={clearCart}>
              Clear Cart
            </Button>
            <Button variant="success" onClick={handleCheckout}>
              Thanh toán
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* Render component Modal và truyền props */}
      <CartModals
        showConfirm={showConfirm}
        handleCloseConfirm={() => setShowConfirm(false)}
        handleConfirmPayment={handleConfirmPayment}
        showSuccess={showSuccess}
        handleCloseSuccess={() => setShowSuccess(false)}
        cartItems={cartItems}
        totalValue={totalValue}
        isDarkMode={isDarkMode}
      />
    </Container>
  );
};

export default Cart;
