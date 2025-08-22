import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { FaSignInAlt, FaExclamationTriangle } from "react-icons/fa";

const LoginConfirmationModal = ({ show, onHide, onConfirm }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FaExclamationTriangle className="text-warning me-2" />
          Login Required
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You need to be logged in to proceed with the checkout.</p>
        <p>Would you like to go to the login page now?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          <FaSignInAlt className="me-2" />
          Go to Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

LoginConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default LoginConfirmationModal;
