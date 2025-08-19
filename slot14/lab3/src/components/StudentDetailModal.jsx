import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const StudentDetailModal = ({ student, show, onHide }) => (
  <Modal show={show} onHide={onHide} centered className="modal-theme">
    <Modal.Header closeButton>
      <Modal.Title>{student?.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
      <img
        src={student?.avatar || `https://i.pravatar.cc/150?u=${student?.id}`}
        alt={`Avatar of ${student?.name}`}
        className="rounded-circle mb-3"
        style={{ width: '128px', height: '128px', objectFit: 'cover' }}
      />
      <p><strong>ID:</strong> {student?.id}</p>
      <p><strong>Name:</strong> {student?.name}</p>
      <p><strong>Email:</strong> {student?.email}</p>
      <p><strong>Age:</strong> {student?.age}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default StudentDetailModal;