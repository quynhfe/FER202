import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Nav, Button, Navbar, Container, Modal, Form, Toast } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';
import logoImg from '../assets/logo.jpg';
import { useState } from 'react';

function Header() {
  const [showForm, setShowForm] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      setShowToast(true)
      setShowForm(false);
    }
    setValidated(true);
  };
  
  const handleShow = () => {
    setShowForm(true);
    setValidated(false);
  };
  return (
    <>
      <StyledNavbar expand="lg">
        <Container fluid>
          <BrandTitle href="#home">
            <Logo src={logoImg} alt="Healthy Recipe Finder Logo" />
            <span>Healthy Recipe Finder</span>
          </BrandTitle>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto" activeKey="/recipes">
              <StyledNavLink href="/home">Home</StyledNavLink>
              <StyledNavLink href="/about">About</StyledNavLink>
              <StyledNavLink href="/recipes">Recipes</StyledNavLink>
            </Nav>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Button
                onClick={() => handleShow(true)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#fc933dff',
                  color: '#fff',
                  borderRadius: '10px',
                  border: 'none',
                  padding: '10px 20px'
                }}
              >
                Recipe Request Form
              </Button>
              <StyledButton>
                Browse Recipes
              </StyledButton>
            </div>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Request Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your name"
              />
              <Form.Control.Feedback type="invalid">
                Please enter your name
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email"
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Desired Ingredient</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="E.g., Fresh basil, chicken breast..."
              />
              <Form.Control.Feedback type="invalid">
                Please enter your desired ingredient
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Max Prep Time</Form.Label>
              <Form.Select required>
                <option value="">Select...</option>
                <option>5 mins</option>
                <option>10 mins</option>
                <option>15 mins</option>
                <option>30 mins</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please choose a max prep time
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Any additional details..."
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide additional details
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" className="d-flex align-items-center gap-2">
              <FaPaperPlane /> Submit Request
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Toast
        bg="success"
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={5000}
        autohide
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <Toast.Body className="text-white">Form submitted successfully</Toast.Body>
      </Toast>
    </>
  );
}

export default Header;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const BrandTitle = styled(Navbar.Brand)`
  color: #025331ff !important;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const StyledNavLink = styled(Nav.Link)`
  color: #025331ff !important; 
  font-weight: 600;
  &.active {
    border-bottom: 2px solid #fc933dff !important;
  }
  @media (max-width: 991px) {
    text-align: center;
    padding: 8px 0;
  }
`;

const StyledButton = styled(Button)`
  background-color: #025331ff;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  &:hover {
    background-color: #fc933dff;
  }
  @media (max-width: 991px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const StyledNavbar = styled(Navbar)`
  padding: 10px 50px;
  border-bottom: 3px solid #e0e0e0;
  background-color: #ffffff;
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;