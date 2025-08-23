import React, { useState, useContext } from "react";
import { Form, Button, Card, InputGroup, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContext } from "../../context/ToastContext";
import { sampleAccounts } from "../../data/accounts";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const validate = () => {
    const { identifier, password } = formData;
    const newErrors = {};

    if (!identifier) {
      newErrors.identifier = "Username or Email is required.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name] || errors.general) {
      setErrors({ ...errors, [name]: null, general: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const { identifier, password } = formData;
    const registeredUsers =
      JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const allUsers = [...sampleAccounts, ...registeredUsers];

    const foundUser = allUsers.find(
      (user) =>
        (user.username === identifier || user.email === identifier) &&
        user.password === password
    );

    if (foundUser) {
      login({ username: foundUser.username });
      showToast(`Welcome back, ${foundUser.username}!`);
      navigate("/home");
    } else {
      setErrors({ general: "Incorrect username/email or password." });
    }
  };

  return (
    <Card className="p-4 p-md-5 shadow-lg border-0 auth-card">
      <Card.Body>
        <h2 className="text-center mb-4">Welcome Back!</h2>
        {errors.general && <Alert variant="danger">{errors.general}</Alert>}
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formIdentifier">
            <Form.Label>Username or Email</Form.Label>
            <Form.Control
              type="text"
              name="identifier"
              placeholder="Enter your username or email"
              value={formData.identifier}
              onChange={handleChange}
              isInvalid={!!errors.identifier}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.identifier}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
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
