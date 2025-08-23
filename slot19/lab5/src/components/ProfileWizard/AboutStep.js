// src/components/ProfileWizard/AboutStep.js
import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaUser } from "react-icons/fa";

const AboutStep = ({ data, onFieldChange, onFileChange, errors }) => (
  <div className="wizard-step-component">
    <h5 className="text-center mb-4">Personal Information</h5>
    <Row>
      <Col md={4} className="text-center mb-4 mb-md-0">
        <Form.Label htmlFor="file-upload" className="profile-image-upload">
          {data.previewImage ? (
            <img
              src={data.previewImage}
              alt="Preview"
              className="profile-image-preview"
            />
          ) : (
            <div className="profile-image-placeholder">
              <FaUser size={50} />
            </div>
          )}
        </Form.Label>
        <Form.Control
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          className="d-none"
        />
        <div className="form-text mt-2">Upload Photo</div>
      </Col>
      <Col md={8}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="firstName">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                value={data.firstName}
                onChange={(e) => onFieldChange("firstName", e.target.value)}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                value={data.lastName}
                onChange={(e) => onFieldChange("lastName", e.target.value)}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email *</Form.Label>
          <Form.Control
            type="email"
            value={data.email}
            onChange={(e) => onFieldChange("email", e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Age *</Form.Label>
          <Form.Control
            type="number"
            value={data.age}
            onChange={(e) =>
              onFieldChange("age", parseInt(e.target.value) || "")
            }
            isInvalid={!!errors.age}
            min="18"
            max="100"
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
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
