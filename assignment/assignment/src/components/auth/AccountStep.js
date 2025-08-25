// src/components/auth/AccountStep.js

import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import config from "../../config";

const AccountStep = ({
  data,
  setData,
  errors,
  setErrors,
  checkUsernameExists,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUsernameBlur = async (e) => {
    const username = e.target.value;
    if (username.length >= 6) {
      const exists = await checkUsernameExists(username);
      if (exists) {
        setErrors((prev) => ({
          ...prev,
          username: "This username is already taken.",
        }));
      }
    }
  };

  // MODIFICATION: Generic handler for real-time validation
  const handleChange = (e) => {
    const { id, value } = e.target;
    const newErrors = { ...errors };

    // Update data state first
    setData((prevData) => ({ ...prevData, [id]: value }));

    // Then, perform validation and update errors state
    switch (id) {
      case "username":
        if (value.length >= 6) {
          delete newErrors.username;
        } else {
          newErrors.username = "Username must be at least 6 characters.";
        }
        break;
      case "password":
        if (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
        ) {
          delete newErrors.password;
        } else {
          newErrors.password =
            "Must be 8+ characters, with uppercase, number, and special character.";
        }
        // Also re-validate confirm password field if password changes
        if (data.confirm && value !== data.confirm) {
          newErrors.confirm = "Passwords do not match.";
        } else {
          delete newErrors.confirm;
        }
        break;
      case "confirm":
        if (value === data.password) {
          delete newErrors.confirm;
        } else {
          newErrors.confirm = "Passwords do not match.";
        }
        break;
      case "secretQuestion":
        if (value) {
          delete newErrors.secretQuestion;
        } else {
          newErrors.secretQuestion = "Please select a question.";
        }
        break;
      case "secretAnswer":
        if (value) {
          delete newErrors.secretAnswer;
        } else {
          newErrors.secretAnswer = "Answer is required.";
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
  };

  return (
    <div className="account-step-container">
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={data.username}
          onChange={handleChange} // MODIFICATION
          onBlur={handleUsernameBlur}
          isInvalid={!!errors.username}
          placeholder="Choose a username (min 6 characters)"
          required
        />
        <Form.Control.Feedback type="invalid">
          {errors.username}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type={showPassword ? "text" : "password"}
            value={data.password}
            onChange={handleChange} // MODIFICATION
            isInvalid={!!errors.password}
            placeholder="Create a strong password"
            required
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Button>
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="confirm">
        <Form.Label>Confirm Password</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type={showConfirm ? "text" : "password"}
            value={data.confirm}
            onChange={handleChange} // MODIFICATION
            isInvalid={!!errors.confirm}
            placeholder="Confirm your password"
            required
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowConfirm(!showConfirm)}
            type="button"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </Button>
          <Form.Control.Feedback type="invalid">
            {errors.confirm}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group className="mb-3" controlId="secretQuestion">
        <Form.Label>Secret Question</Form.Label>
        <Form.Select
          value={data.secretQuestion}
          onChange={handleChange} // MODIFICATION
          isInvalid={!!errors.secretQuestion}
          required
        >
          <option value="">-- Select a Question --</option>
          {config.app.SECRET_QUESTIONS.map((q, i) => (
            <option key={i} value={q}>
              {q}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.secretQuestion}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="secretAnswer">
        <Form.Label>Secret Answer</Form.Label>
        <Form.Control
          type="text"
          value={data.secretAnswer}
          onChange={handleChange} // MODIFICATION
          isInvalid={!!errors.secretAnswer}
          placeholder="Enter your answer"
          required
        />
        <Form.Control.Feedback type="invalid">
          {errors.secretAnswer}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

export default AccountStep;
