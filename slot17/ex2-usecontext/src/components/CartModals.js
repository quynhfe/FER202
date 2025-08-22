import React from "react";
import { Modal, ListGroup, Button } from "react-bootstrap";

const CartModals = ({
  showConfirm,
  handleCloseConfirm,
  handleConfirmPayment,
  showSuccess,
  handleCloseSuccess,
  cartItems,
  totalValue,
  isDarkMode,
}) => {
  const modalClass = isDarkMode ? "dark-mode-modal" : "";

  return (
    <>
      <Modal
        show={showConfirm}
        onHide={handleCloseConfirm}
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
          <Button variant="secondary" onClick={handleCloseConfirm}>
            Hủy
          </Button>
          <Button variant="success" onClick={handleConfirmPayment}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showSuccess}
        onHide={handleCloseSuccess}
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
    </>
  );
};

export default CartModals;
