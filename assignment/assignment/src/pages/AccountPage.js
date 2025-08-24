import React, { useContext, useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert, Image } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { Navigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const AccountPage = () => {
  const { user, updateUser, isAuthenticated } = useContext(AuthContext);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({ fullName: "", avatar: null });
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || "",
        avatar: user.avatar || null,
      });
      setPreview(user.avatar || null);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setError("Only JPG/PNG formats are allowed.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        // 2MB
        setError("File size must be less than 2MB.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
      setError("");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName) {
      setError("Full name is required.");
      return;
    }
    const updated = await updateUser(user.id, formData);
    if (updated) {
      showToast("Profile updated successfully!", "success");
    } else {
      setError("Failed to update profile.");
      showToast("Failed to update profile.", "danger");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login?redirect_uri=/account" replace />;
  }

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ width: "100%", maxWidth: "600px" }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">My Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} noValidate>
            <div className="text-center mb-4">
              <Form.Label
                htmlFor="profile-avatar-upload"
                className="profile-image-upload"
              >
                {preview ? (
                  <Image
                    src={preview}
                    roundedCircle
                    width="150"
                    height="150"
                    className="object-fit-cover"
                  />
                ) : (
                  <div
                    className="profile-image-placeholder"
                    style={{ width: 150, height: 150, margin: "0 auto" }}
                  >
                    <FaUser size={60} />
                  </div>
                )}
              </Form.Label>
              <Form.Control
                id="profile-avatar-upload"
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFileChange}
                className="d-none"
              />
              <div className="form-text mt-2">Update Photo</div>
            </div>

            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" value={user?.email || ""} disabled />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit">
                Update Profile
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AccountPage;
