import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Modal, Button } from "react-bootstrap";

const Cart = () => {
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
    <div className="container my-4">
      <h2 className="text-center mb-4">🛒 Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info text-center">
          Giỏ hàng của bạn đang trống.
        </div>
      ) : (
        <div className="card shadow-sm">
          <ul className="list-group list-group-flush">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.name}</strong> <br />
                  <span className="text-muted">
                    ${parseFloat(item.price).toFixed(2)}
                  </span>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="card-body text-end">
            <p className="mb-1">
              Tổng số món: <strong>{cartItems.length}</strong>
            </p>
            <p className="mb-3">
              Tổng giá trị: <strong>${totalValue}</strong>
            </p>
            <button className="btn btn-danger me-2" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="btn btn-success" onClick={handleCheckout}>
              Thanh toán
            </button>
          </div>
        </div>
      )}

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận thanh toán</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Hóa đơn của bạn</h5>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between"
              >
                <span>{item.name}</span>
                <span>${parseFloat(item.price).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="fw-bold text-end">Tổng cộng: ${totalValue}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleConfirmPayment}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
        <Modal.Body className="text-center">
          <h4 className="text-success">✅ Thanh toán thành công!</h4>
        </Modal.Body>
      </Modal>

      <Modal show={showSuccess} onHide={() => setShowSuccess(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-success">
            ✅ Thanh toán thành công
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Cảm ơn bạn đã mua hàng 🎉</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Cart;
