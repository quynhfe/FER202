import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import {
  Container,
  Card,
  Button,
  Modal,
  ListGroup,
  Alert,
} from "react-bootstrap";

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

  const modalClass = isDarkMode ? "dark-mode-modal" : "";

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

      {/* Modal xác nhận */}
      <Modal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        contentClassName={modalClass}
      >
        <Modal.Header closeButton className={modalClass}>
          <Modal.Title>Xác nhận thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body className={modalClass}>
          <h5>Hóa đơn của bạn</h5>
          <ListGroup className="mb-3">
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.id}
                className={`d-flex justify-content-between ${modalClass}`}
              >
                <span>{item.name}</span>
                <span>${parseFloat(item.price).toFixed(2)}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <p className="fw-bold text-end">Tổng cộng: ${totalValue}</p>
        </Modal.Body>
        <Modal.Footer className={modalClass}>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleConfirmPayment}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal thành công */}
      <Modal
        show={showSuccess}
        onHide={() => setShowSuccess(false)}
        centered
        contentClassName={modalClass}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-success">
            ✅ Thanh toán thành công
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Cảm ơn bạn đã mua hàng 🎉</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Cart;
