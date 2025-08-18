import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


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
    <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
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
          <div className="modal-body">
            {children}
          </div>
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



const Card = ({ children, className = "" }) => (
  <div className={`card ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="card-header">{children}</div>
);

const CardBody = ({ children }) => (
  <div className="card-body">{children}</div>
);

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });

  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên không được để trống';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email không được để trống';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Email phải chứa ký tự @';
    }

    if (!formData.age) {
      newErrors.age = 'Tuổi không được để trống';
    } else if (parseInt(formData.age) < 1) {
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
      setShowModal(true);
      console.log('Form submitted successfully:', formData);
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
                    value={formData.name}
                    onChange={handleInputChange}
                    isInvalid={validated && errors.name}
                    isValid={validated && !errors.name && formData.name.trim()}
                  />
                  {errors.name && (
                    <FormFeedback type="invalid">
                      {errors.name}
                    </FormFeedback>
                  )}
                  {formData.name && !errors.name && (
                    <div className="text-muted mt-1">
                      My name is {formData.name}
                    </div>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    isInvalid={validated && errors.email}
                    isValid={validated && !errors.email && formData.email.trim()}
                  />
                  {errors.email && (
                    <FormFeedback type="invalid">
                      {errors.email}
                    </FormFeedback>
                  )}
                  {formData.email && !errors.email && (
                    <div className="text-muted mt-1">
                      My email is {formData.email}
                    </div>
                  )}
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="age">Tuổi</FormLabel>
                  <FormControl
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="1"
                    isInvalid={validated && errors.age}
                    isValid={validated && !errors.age && formData.age}
                  />
                  {errors.age && (
                    <FormFeedback type="invalid">
                      {errors.age}
                    </FormFeedback>
                  )}
                  {formData.age && !errors.age && (
                    <div className="text-muted mt-1">
                      I am {formData.age} years old
                    </div>
                  )}
                </FormGroup>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="button"
                    disabled={!formData.name || !formData.email || !formData.age}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </div>
              </div>

              {!showModal && showModal === false && Object.values(formData).every(value => value) && validated && Object.keys(errors).length === 0 && (
                <div className="mt-4 p-3 bg-light rounded">
                  <h5>Thông tin đã submit thành công!</h5>
                  <p><strong>Tên:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Tuổi:</strong> {formData.age}</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Thành công!"
      >
        <div className="text-center">
          <div className="mb-3">
            <i className="fas fa-check-circle text-success" style={{fontSize: '3rem'}}></i>
          </div>
          <h5 className="text-success mb-3">Submitted successfully!</h5>
          <div className="text-start">
            <p><strong>Tên:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Tuổi:</strong> {formData.age}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileForm;