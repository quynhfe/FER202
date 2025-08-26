// src/features/auth/LoginForm.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./authSlice";
import { Form, Button, Card, Container } from "react-bootstrap";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <Container style={{ maxWidth: "400px", marginTop: "20px" }}>
      <Card className="shadow-sm border-0">
        <Card.Body>
          {user ? (
            <div className="text-center">
              <h5 className="mb-3">
                Xin chào, <strong>{user}</strong> 👋
              </h5>
              <Button
                variant="outline-danger"
                onClick={() => dispatch(logout())}
              >
                Đăng xuất
              </Button>
            </div>
          ) : (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (username.trim()) {
                  dispatch(login(username));
                  setUsername("");
                }
              }}
            >
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>👤 Tên đăng nhập</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Đăng nhập
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
