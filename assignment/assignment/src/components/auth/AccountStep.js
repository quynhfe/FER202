import React, { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import config from "../../config";

const AccountStep = ({ data, setData, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}
          isInvalid={!!errors.username}
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
            onChange={(e) => setData({ ...data, password: e.target.value })}
            isInvalid={!!errors.password}
            required
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowPassword(!showPassword)}
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
            onChange={(e) => setData({ ...data, confirm: e.target.value })}
            isInvalid={!!errors.confirm}
            required
          />
          <Button
            variant="outline-secondary"
            onClick={() => setShowConfirm(!showConfirm)}
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
          onChange={(e) => setData({ ...data, secretQuestion: e.target.value })}
          isInvalid={!!errors.secretQuestion}
          required
        >
          <option value="">-- Select a Question --</option>
          {/* Sửa cách truy cập */}
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
          onChange={(e) => setData({ ...data, secretAnswer: e.target.value })}
          isInvalid={!!errors.secretAnswer}
          required
        />
        <Form.Control.Feedback type="invalid">
          {errors.secretAnswer}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};

export default AccountStep;
