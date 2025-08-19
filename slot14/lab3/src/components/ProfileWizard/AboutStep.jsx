import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaUser } from 'react-icons/fa';

const AboutStep = ({ data, onFieldChange, onFileChange, errors }) => (
    <div style={{ padding: '20px' }}>
        <h5 style={{ marginBottom: '20px', textAlign: 'center', color: '#495057' }}>Personal Information</h5>
        <Row>
            <Col md={4} className="text-center mb-4">
                <Form.Label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                    {data.previewImage ? (
                        <img
                            src={data.previewImage}
                            alt="Preview"
                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #dee2e6' }}
                        />
                    ) : (
                        <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px dashed #adb5bd', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
                            <FaUser size={40} color="#adb5bd" />
                        </div>
                    )}
                </Form.Label>
                <Form.Control id="file-upload" type="file" accept="image/*" onChange={onFileChange} className="d-none" />
                <div style={{ fontSize: '0.8rem', color: '#6c757d', marginTop: '5px' }}>Upload Photo</div>
            </Col>

            <Col md={8}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name *</Form.Label>
                            <Form.Control type="text" value={data.firstName} onChange={(e) => onFieldChange('firstName', e.target.value)} isInvalid={!!errors.firstName} style={{ borderRadius: '4px' }} />
                            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name *</Form.Label>
                            <Form.Control type="text" value={data.lastName} onChange={(e) => onFieldChange('lastName', e.target.value)} isInvalid={!!errors.lastName} style={{ borderRadius: '4px' }} />
                            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control type="email" value={data.email} onChange={(e) => onFieldChange('email', e.target.value)} isInvalid={!!errors.email} style={{ borderRadius: '4px' }} />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Age *</Form.Label>
                    <Form.Control type="number" value={data.age} onChange={(e) => onFieldChange('age', parseInt(e.target.value))} isInvalid={!!errors.age} style={{ borderRadius: '4px' }} min="1" max="100" />
                    <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
    </div>
);

AboutStep.propTypes = {
    data: PropTypes.object.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onFileChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

export default AboutStep;