import React from "react";
import { Modal, Button, ListGroup, Row, Col, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";

const ConfirmationModal = ({ show, onHide, onConfirm, data, isLoading }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Your Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please review your information before creating your account.</p>
        <Row>
          <Col
            md={4}
            className="d-flex flex-column align-items-center justify-content-center mb-3 mb-md-0"
          >
            {data.previewImage ? (
              <img
                src={data.previewImage}
                alt="Avatar Preview"
                className="profile-image-preview large"
              />
            ) : (
              <div className="profile-image-placeholder large">
                <FaUser size={60} />
              </div>
            )}
          </Col>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Badge bg="primary" className="me-2">
                  Personal
                </Badge>
                <strong>Full Name:</strong> {data.fullName}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {data.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <Badge bg="info" className="me-2">
                  Account
                </Badge>
                <strong>Username:</strong> {data.username}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Secret Question:</strong> {data.secretQuestion}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Secret Answer:</strong> {data.secretAnswer}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={isLoading}>
          Go Back & Edit
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Creating Account...
            </>
          ) : (
            "Confirm and Create Account"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
};

ConfirmationModal.defaultProps = {
  isLoading: false,
};

export default ConfirmationModal;
