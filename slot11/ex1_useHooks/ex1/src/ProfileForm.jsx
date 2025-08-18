import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <CardHeader>
              <h4 className="mb-0">Profile Form</h4>
            </CardHeader>
            <CardBody>
              <div onSubmit={handleSubmit} className="needs-validation">

                <FormGroup>
                  <FormLabel htmlFor="name">Tên</FormLabel>
                  <FormControl
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={validated && errors.name}
                    isValid={validated && !errors.name && name.trim()}
                  />
                  {errors.name && (
                    <FormFeedback type="invalid">{errors.name}</FormFeedback>
                  )}
                  {name && !errors.name && (
                    <div className="text-muted mt-1">My name is {name}</div>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={validated && errors.email}
                    isValid={validated && !errors.email && email.trim()}
                  />
                  {errors.email && (
                    <FormFeedback type="invalid">{errors.email}</FormFeedback>
                  )}
                  {email && !errors.email && (
                    <div className="text-muted mt-1">My email is {email}</div>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="age">Tuổi</FormLabel>
                  <FormControl
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    min="1"
                    isInvalid={validated && errors.age}
                    isValid={validated && !errors.age && age}
                  />
                  {errors.age && (
                    <FormFeedback type="invalid">{errors.age}</FormFeedback>
                  )}
                  {age && !errors.age && (
                    <div className="text-muted mt-1">I am {age} years old</div>
                  )}
                </FormGroup>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="button"
                    disabled={!name || !email || !age}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Thông tin đã submit"
      >
        <Card>
          <CardHeader>
            <h5 className="mb-0 text-success">
              <i className="fas fa-check-circle me-2"></i>
              Submit thành công!
            </h5>
          </CardHeader>
          <CardBody>
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
          </CardBody>
        </Card>
      </Modal>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        className="bg-success text-white"
      >
        Submitted successfully!
      </Toast>
    </div>
  );
};

export default ProfileForm;

const FormGroup = ({ children, className = "" }) => (
  <div className={`mb-3 ${className}`}>{children}</div>
);

const FormLabel = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="form-label">{children}</label>
);

const FormControl = ({ type, placeholder, value, onChange, isInvalid, isValid, ...props }) => {
  let className = "form-control";
  if (isInvalid) className += " is-invalid";
  if (isValid) className += " is-valid";

  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

const FormFeedback = ({ type, children }) => (
  <div className={`${type === 'invalid' ? 'invalid-feedback' : 'valid-feedback'}`}>
    {children}
  </div>
);

const Button = ({ variant, type, disabled, children, onClick }) => (
  <button
    type={type}
    className={`btn btn-${variant}`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <Button variant="primary" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Toast = ({ show, onClose, children, className = "" }) => {
  if (!show) return null;

  return (
    <div className={`toast show position-fixed top-0 end-0 m-3 ${className}`} role="alert">
      <div className="toast-header">
        <strong className="me-auto">Thông báo</strong>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
      <div className="toast-body">{children}</div>
    </div>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="card-header">{children}</div>
);

const CardBody = ({ children }) => (
  <div className="card-body">{children}</div>
);
