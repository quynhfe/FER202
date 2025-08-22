import React from "react";
import { Modal, Button, ListGroup, Row, Col, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";

const ConfirmationModal = ({ show, onHide, onConfirm, data }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Confirm Your Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Please review the information you've entered before final submission.
        </p>
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
                  About
                </Badge>
                <strong>Name:</strong> {data.firstName} {data.lastName}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Email:</strong> {data.email}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Age:</strong> {data.age}
              </ListGroup.Item>
              <ListGroup.Item>
                <Badge bg="info" className="me-2">
                  Address
                </Badge>
                <strong>Address:</strong>{" "}
                {`${data.streetNumber} ${data.streetName}, ${data.city}, ${data.country}`}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Go Back & Edit
        </Button>
        <Button variant="success" onClick={onConfirm}>
          Confirm and Submit
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
};

export default ConfirmationModal;
