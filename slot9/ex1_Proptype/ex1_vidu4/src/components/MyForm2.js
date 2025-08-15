import React, { useState, useReducer } from "react";
import { Button, Form, Container, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

// Reducer để quản lý trạng thái form
const initialState = {
  name: "",
  age: "",
  email: "",
  phone: "",
  gender: "",
  termsAccepted: false,
  isSubmitted: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SUBMIT":
      return { ...state, isSubmitted: true };
    default:
      return state;
  }
};

const MyForm2 = ({ title, onSubmit }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleValidation = () => {
    const newErrors = {};

    if (!state.name) {
      newErrors.name = "Tên không được để trống!";
    } else if (state.name.length < 3 || state.name.length > 50) {
      newErrors.name = "Tên phải chứa từ 3 đến 50 ký tự!";
    }

    const age = parseInt(state.age, 10);
    if (!state.age) {
      newErrors.age = "Tuổi không được để trống!";
    } else if (isNaN(age)) {
      newErrors.age = "Tuổi phải là một số hợp lệ!";
    } else if (age < 18 || age > 100) {
      newErrors.age = "Tuổi phải nằm trong khoảng 18-100!";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!state.email) {
      newErrors.email = "Email không được để trống!";
    } else if (!emailRegex.test(state.email)) {
      newErrors.email = "Email không đúng định dạng!";
    }

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!state.phone) {
      newErrors.phone = "Số điện thoại không được để trống!";
    } else if (!phoneRegex.test(state.phone)) {
      newErrors.phone = "Số điện thoại phải từ 10 đến 15 chữ số!";
    }

    if (!state.termsAccepted) {
      newErrors.termsAccepted = "Đồng ý với điều khoản!";
    }

    // Hiện alert nếu có lỗi
    setShowAlert(Object.keys(newErrors).length > 0);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch({ type: "SUBMIT" });
      onSubmit(state);
    }
  };

  return (
    <Container>
      <h3>{title}</h3>

      {/* Hiển thị Alert nếu có lỗi */}
      {showAlert && (
        <Alert variant="danger">
          <strong>Lỗi:</strong> Vui lòng kiểm tra các trường hợp lỗi.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAge">
          <Form.Label>Tuổi</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={state.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="phone"
            name="phone"
            value={state.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formGender">
          <Form.Label>Giới tính</Form.Label>
          <Form.Control
            type="text"
            name="gender"
            value={state.gender}
            onChange={handleChange}
            isInvalid={!!errors.gender}
          />
        </Form.Group>

        <Form.Group controlId="formTerms" className="mt-3">
          <Form.Check
            type="checkbox"
            label="Tôi đồng ý với điều khoản"
            name="termsAccepted"
            checked={state.termsAccepted}
            onChange={handleChange}
            isInvalid={!!errors.termsAccepted}
          />
          <Form.Control.Feedback type="invalid">
            {errors.termsAccepted}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

MyForm2.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default MyForm2;
