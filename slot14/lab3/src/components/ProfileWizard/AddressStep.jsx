import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddressStep = ({ data, onFieldChange, errors }) => {
    const countries = ["Viet Nam", "Korea", "Italy", "Japan", "USA", "Germany", "France"];
    return (
        <Form noValidate>
            <Row>
                <Col md={8}><Form.Group className="mb-3" controlId="streetName">
                    <Form.Label>Street Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={data.streetName}
                        onChange={(e) => onFieldChange('streetName', e.target.value)}
                        isInvalid={!!errors.streetName} required />
                    <Form.Control.Feedback type="invalid">
                        {errors.streetName}
                    </Form.Control.Feedback>
                </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group className="mb-3" controlId="streetNumber">
                        <Form.Label>Street Number</Form.Label>
                        <Form.Control type="text"
                            value={data.streetNumber}
                            onChange={(e) => onFieldChange('streetNumber', e.target.value)}
                            isInvalid={!!errors.streetNumber}
                            required />
                        <Form.Control.Feedback type="invalid">{errors.streetNumber}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}><Form.Group className="mb-3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text"
                        value={data.city}
                        onChange={(e) => onFieldChange('city', e.target.value)}
                        isInvalid={!!errors.city} required /><Form.Control.Feedback
                            type="invalid">{errors.city}</Form.Control.Feedback>
                </Form.Group>
                </Col>
                <Col md={6}><Form.Group className="mb-3" controlId="country">
                    <Form.Label>Country</Form.Label><Form.Select
                        value={data.country}
                        onChange={(e) => onFieldChange('country', e.target.value)}
                        isInvalid={!!errors.country}
                        required>{countries.map(c => <option
                            key={c} value={c}>{c}</option>)}</Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.country}
                    </Form.Control.Feedback>
                </Form.Group></Col>
            </Row>
        </Form>
    );
};

AddressStep.propTypes = {
    data: PropTypes.object.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
};

export default AddressStep;