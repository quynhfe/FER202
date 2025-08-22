// src/components/ProfileWizard/AddressStep.js
import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const AddressStep = ({ data, onFieldChange, errors }) => {
  const countries = [
    "Viet Nam",
    "USA",
    "Canada",
    "UK",
    "Australia",
    "Germany",
    "Japan",
  ];

  return (
    <div className="wizard-step-component">
      <h5 className="text-center mb-4">Address Information</h5>
      <Row>
        <Col md={8}>
          <Form.Group className="mb-3" controlId="streetName">
            <Form.Label>Street Name *</Form.Label>
            <Form.Control
              type="text"
              value={data.streetName}
              onChange={(e) => onFieldChange("streetName", e.target.value)}
              isInvalid={!!errors.streetName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.streetName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3" controlId="streetNumber">
            <Form.Label>Street Number *</Form.Label>
            <Form.Control
              type="text"
              value={data.streetNumber}
              onChange={(e) => onFieldChange("streetNumber", e.target.value)}
              isInvalid={!!errors.streetNumber}
            />
            <Form.Control.Feedback type="invalid">
              {errors.streetNumber}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City *</Form.Label>
            <Form.Control
              type="text"
              value={data.city}
              onChange={(e) => onFieldChange("city", e.target.value)}
              isInvalid={!!errors.city}
            />
            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country *</Form.Label>
            <Form.Select
              value={data.country}
              onChange={(e) => onFieldChange("country", e.target.value)}
              isInvalid={!!errors.country}
            >
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.country}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

AddressStep.propTypes = {
  data: PropTypes.object.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default AddressStep;
