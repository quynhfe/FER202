import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';

const StudentCard = ({ student, onViewDetails }) => (
    <Card className="card-theme">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <img
            src={student.avatar || `https://i.pravatar.cc/150?u=${student.id}`}
            alt={`Avatar of ${student.name}`}
            className="rounded-circle me-3"
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
          <div>
            <Card.Title className="mb-1">{student.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted small">{student.email}</Card.Subtitle>
            <Card.Text className="text-muted">Age: {student.age}</Card.Text>
          </div>
        </div>
        <Button className="btn-main-theme mt-auto w-100" onClick={() => onViewDetails(student)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
);

StudentCard.propTypes = {
  student: PropTypes.shape({ 
    id: PropTypes.number.isRequired, 
    name: PropTypes.string.isRequired, 
    email: PropTypes.string.isRequired, 
    age: PropTypes.number.isRequired, 
    avatar: PropTypes.string 
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
};

export default StudentCard;