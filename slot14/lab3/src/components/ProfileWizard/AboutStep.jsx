import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FaUserCircle } from 'react-icons/fa';

const AboutStep = ({ data, onFieldChange, onFileChange, errors }) => (
    <Form noValidate>
        <Row className="align-items-center">
            <Col md={4} className="text-center mb-3 mb-md-0">
                <Form.Label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                    {data.previewImage ? (
                        <img src={data.previewImage}
                            alt="Preview"
                            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #dee2e6' }} />
                    ) : (
                        <div style={{
                            width: '120px', height: '120px', borderRadius: '50%', border: '2px dashed #adb5bd',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <FaUserCircle size={80} color="#adb5bd" />
                            <span style={{ fontSize: '0.8rem', marginTop: '5px', color: '#6c757d' }}>CHOOSE PICTURE</span>
                        </div>
                    )}
                </Form.Label>
                <Form.Control id="file-upload" type="file" accept="image/*" onChange={onFileChange} className="d-none" />
            </Col>
            <Col md={8}>
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Control type="text"
                        placeholder="First Name"
                        value={data.firstName}
                        onChange={(e) => onFieldChange('firstName', e.target.value)}
                        isInvalid={!!errors.firstName} required />
                    <Form.Control.Feedback type="invalid">{errors.firstName}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Control type="text"
                        placeholder="Last Name"
                        value={data.lastName}
                        onChange={(e) => onFieldChange('lastName', e.target.value)}
                        isInvalid={!!errors.lastName} required />
                    <Form.Control.Feedback type="invalid">{errors.lastName}
                    </Form.Control.Feedback></Form.Group>
                <Form.Group controlId="email">
                    <Form.Control type="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={(e) => onFieldChange('email', e.target.value)}
                        isInvalid={!!errors.email} required />
                    <Form.Control.Feedback type="invalid">{errors.email}
                    </Form.Control.Feedback>
                </Form.Group>
            </Col>
        </Row>
    </Form>
);

AboutStep.propTypes = {
    data: PropTypes.object.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onFileChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

export default AboutStep;