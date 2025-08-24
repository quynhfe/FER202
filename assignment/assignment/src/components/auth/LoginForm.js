import React, { useState, useContext } from "react";
import { Form, Button, Card, InputGroup, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    setValidated(true);

    if (form.checkValidity() === false) {
      return;
    }

    setGeneralError("");
    const loggedIn = await login(email, password);
    if (!loggedIn) {
      setGeneralError("Invalid username/email or password.");
    }
  };

  return (
    <Card>
      <Card.Body className="p-4">
        <h2 className="text-center mb-4">Sign In</h2>
        {generalError && <Alert variant="danger">{generalError}</Alert>}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email or Username</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your email or username.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
              <Form.Control.Feedback type="invalid">
                Please enter your password.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <div className="d-grid">
            <Button variant="primary" type="submit">
              Sign In
            </Button>
          </div>
        </Form>
        <div className="mt-3 text-center">
          New Customer? <Link to="/register">Create an account</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
