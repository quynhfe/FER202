import React, { useState, useContext } from "react";
import { Form, Button, Card, InputGroup } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ToastContext } from "../../context/ToastContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "", // Thêm trường email
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const { username, email, password, confirmPassword } = formData;

    if (!username || username.length < 6) {
      newErrors.username = "Username must be at least 6 characters.";
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (
      !password ||
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password)
    ) {
      newErrors.password =
        "Password must be 8+ chars, with an uppercase, a number, and a special character.";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

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
    if (validateForm()) {
      // Lấy danh sách tài khoản đã đăng ký từ localStorage
      const registeredUsers =
        JSON.parse(localStorage.getItem("registeredUsers")) || [];

      // Kiểm tra xem username hoặc email đã tồn tại chưa
      const userExists = registeredUsers.some(
        (user) =>
          user.username === formData.username || user.email === formData.email
      );

      if (userExists) {
        showToast("Username or email already exists.", "danger");
        return;
      }

      // Tạo tài khoản mới
      const newUser = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        password: formData.password, // Lưu ý: Trong thực tế cần mã hóa mật khẩu
      };

      // Thêm tài khoản mới vào danh sách và lưu lại vào localStorage
      registeredUsers.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

      // Đăng nhập và chuyển hướng
      login({ username: formData.username });
      showToast(`Account created successfully! Welcome, ${formData.username}.`);
      navigate("/home");
    }
  };

  return (
    <Card className="p-4 p-md-5 shadow-lg border-0 auth-card">
      <Card.Body>
        <h2 className="text-center mb-4">Create an Account</h2>
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPass ? "text" : "password"}
                name="password"
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

          <Form.Group className="mb-4" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                isInvalid={!!errors.confirmPassword}
                required
              />
              <Button
                variant="outline-secondary"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
              >
                {showConfirmPass ? <FaEyeSlash /> : <FaEye />}
              </Button>
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <div className="d-grid">
            <Button variant="primary" type="submit" size="lg">
              Register
            </Button>
          </div>
        </Form>
        <div className="mt-4 text-center">
          <Link to="/login">Already have an account? Log In</Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RegisterForm;
