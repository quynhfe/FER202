
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Modal, Toast, Form } from 'react-bootstrap';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Tên không được để trống';
    }

    if (!email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!email.includes('@')) {
      newErrors.email = 'Email phải chứa ký tự @';
    }

    if (!age) {
      newErrors.age = 'Tuổi không được để trống';
    } else if (parseInt(age) < 1) {
      newErrors.age = 'Tuổi phải tối thiểu là 1';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);

    if (validateForm()) {
      setShowToast(true);
      setShowModal(true);
      console.log('Form submitted successfully:', { name, email, age });

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card>
            <Card.Header>
              <h4 className="mb-0">Profile Form</h4>
            </Card.Header>
            <Card.Body>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3 d-flex flex-column align-items-start" controlId="name">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={validated && !!errors.name}
                    isValid={validated && !errors.name && name.trim()}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                  {name && !errors.name && (
                    <div className="text-muted mt-1">My name is {name}</div>
                  )}
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex flex-column align-items-start" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={validated && !!errors.email}
                    isValid={validated && !errors.email && email.trim()}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                  {email && !errors.email && (
                    <div className="text-muted mt-1">My email is {email}</div>
                  )}
                </Form.Group>

                <Form.Group
                  className="mb-3 d-flex flex-column align-items-start" controlId="age">
                  <Form.Label>Tuổi</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="1"
                    isInvalid={validated && !!errors.age}
                    isValid={validated && !errors.age && age}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.age}
                  </Form.Control.Feedback>
                  {age && !errors.age && (
                    <div className="text-muted mt-1">I am {age} years old</div>
                  )}
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!name || !email || !age}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin đã submit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mb-3 text-success">
            <i className="fas fa-check-circle me-2"></i>
            Submit thành công!
          </h5>
          <div className="row">
            <div className="col-sm-4"><strong>Tên:</strong></div>
            <div className="col-sm-8">{name}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-4"><strong>Email:</strong></div>
            <div className="col-sm-8">{email}</div>
          </div>
          <hr />
          <div className="row">
            <div className="col-sm-4"><strong>Tuổi:</strong></div>
            <div className="col-sm-8">{age} tuổi</div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        bg="success"
        className="text-white position-fixed top-0 end-0 m-3"
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Thông báo</strong>
        </Toast.Header>
        <Toast.Body>Submitted successfully!</Toast.Body>
      </Toast>
    </div>
  );
};

export default ProfileForm;
