import React, { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContext } from "../../context/ToastContext";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const validate = () => {
    const { username, password } = formData;
    const newErrors = {};
    if (!username) newErrors.username = "Username is required.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password should be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      login({ username: formData.username });
      showToast(`Welcome back, ${formData.username}!`);
      navigate("/home");
    }
  };

  return (
    <Card className="p-4 p-md-5 shadow-lg border-0 auth-card">
      <Card.Body>
        <h2 className="text-center mb-4">Welcome Back!</h2>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg">
              Login
            </Button>
          </div>
        </Form>
        <div className="mt-4 text-center">
          <Link to="/register">Don't have an account? Sign Up</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
