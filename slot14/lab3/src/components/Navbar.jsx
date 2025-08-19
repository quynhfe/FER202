import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const AppNavbar = ({ onShowProfileWizard }) => (
  <Navbar expand="lg" className="navbar-theme">
    <Container>
      <Navbar.Brand href="#home">StudentHub</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#students" active>Students</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
        <Nav className="ms-auto">
          <Button 
            className="btn-accent-theme" 
            onClick={onShowProfileWizard}
            size="sm"
          >
            Build your Profile
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default AppNavbar;