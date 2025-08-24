import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginConfirmationModal = ({ show, onHide }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onHide();
    navigate("/login");
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You need to be logged in to perform this action. Would you like to log
        in now?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Go to Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginConfirmationModal;
