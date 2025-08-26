// src/components/auth/AboutStep.js

import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FaUser } from "react-icons/fa";

const AboutStep = ({ data, setData, errors, setErrors, checkEmailExists }) => {
  const [preview, setPreview] = React.useState(data.avatar);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const newErrors = { ...errors };

    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        newErrors.avatar = "Only JPG/PNG formats are allowed.";
      } else if (file.size > 2 * 1024 * 1024) {
        newErrors.avatar = "File size must be less than 2MB.";
      } else {
        delete newErrors.avatar;
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
          setData({ ...data, avatar: reader.result });
        };
        reader.readAsDataURL(file);
      }
    } else {
      delete newErrors.avatar;
    }
    setErrors(newErrors);
  };

  const handleEmailBlur = async (e) => {
    const email = e.target.value;
    if (/^\S+@\S+\.\S+$/.test(email)) {
      const exists = await checkEmailExists(email);
      if (exists) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered.",
        }));
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });

    const newErrors = { ...errors };
    switch (id) {
      case "fullName":
        if (value) delete newErrors.fullName;
        else newErrors.fullName = "Full name is required.";
        break;
      case "email":
        if (/^\S+@\S+\.\S+$/.test(value)) delete newErrors.email;
        else newErrors.email = "Valid email is required.";
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  // === MODIFICATION START: Re-structured with Row and Col ===
  return (
    <Row className="align-items-center">
      {/* Left Column for Avatar */}
      <Col md={5} className="mb-4 mb-md-0">
        <div className="profile-section text-center">
          <Form.Label htmlFor="file-upload" className="profile-image-upload">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="profile-image-preview"
              />
            ) : (
              <div className="profile-image-placeholder">
                <FaUser size={40} />
              </div>
            )}
          </Form.Label>
          <Form.Control
            id="file-upload"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="d-none"
            isInvalid={!!errors.avatar}
          />
          <div className="form-text mt-2">
            <label>Upload Photo (Optional, &lt;2MB)</label>
          </div>
          {errors.avatar && (
            <div className="d-block invalid-feedback text-center mt-1">
              <small>{errors.avatar}</small>
            </div>
          )}
        </div>
      </Col>

      {/* Right Column for Form Fields */}
      <Col md={7}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={data.fullName}
            onChange={handleChange}
            isInvalid={!!errors.fullName}
            placeholder="Enter your full name"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={data.email}
            onChange={handleChange}
            onBlur={handleEmailBlur}
            isInvalid={!!errors.email}
            placeholder="Enter your email address"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  );
  // === MODIFICATION END ===
};

export default AboutStep;
