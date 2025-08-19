import React from 'react';
import { Modal, Button, ListGroup, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';

const ConfirmationModal = ({ show, onHide, onConfirm, data }) => {
    return (
        <Modal show={show} onHide={onHide} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Confirm Your Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Please review all the information you have entered before submitting.</p>
                <Row>
                    <Col md={4} className="d-flex flex-column align-items-center justify-content-center mb-3 mb-md-0">
                        {data.previewImage ? (
                            <img 
                                src={data.previewImage} 
                                alt="Avatar Preview" 
                                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #dee2e6' }} 
                            />
                        ) : (
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '2px dashed #adb5bd', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
                                <FaUser size={60} color="#adb5bd" />
                            </div>
                        )}
                        <small className="mt-2 text-muted">Avatar</small>
                    </Col>
                    <Col md={8}>
                        <ListGroup variant="flush">
                            <ListGroup.Item><strong>First Name:</strong> {data.firstName}</ListGroup.Item>
                            <ListGroup.Item><strong>Last Name:</strong> {data.lastName}</ListGroup.Item>
                            <ListGroup.Item><strong>Email:</strong> {data.email}</ListGroup.Item>
                            <ListGroup.Item><strong>Age:</strong> {data.age}</ListGroup.Item>
                            <ListGroup.Item><strong>Username:</strong> {data.username}</ListGroup.Item>
                            <ListGroup.Item><strong>Address:</strong> {`${data.streetName} ${data.streetNumber}, ${data.city}, ${data.country}`}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Go Back
                </Button>
                <Button variant="primary" onClick={onConfirm}>
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