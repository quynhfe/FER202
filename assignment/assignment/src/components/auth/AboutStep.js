import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FaUser } from "react-icons/fa";

const AboutStep = ({ data, setData, errors, setErrors }) => {
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

  return (
    <Row>
      <Col md={4} className="text-center mb-4 mb-md-0">
        <Form.Label htmlFor="file-upload" className="profile-image-upload">
          {preview ? (
            <img
              src={preview}
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
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="d-none"
          isInvalid={!!errors.avatar}
        />
        <div className="form-text mt-2">Upload Photo (Optional)</div>
        {errors.avatar && (
          <div className="d-block invalid-feedback text-center mt-1">
            {errors.avatar}
          </div>
        )}
      </Col>
      <Col md={8}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={data.fullName}
            onChange={(e) => setData({ ...data, fullName: e.target.value })}
            isInvalid={!!errors.fullName}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            isInvalid={!!errors.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  );
};

export default AboutStep;
