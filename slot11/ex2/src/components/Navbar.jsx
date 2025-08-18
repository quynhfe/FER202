import React from 'react';
import { Navbar, Container, Nav, Form } from 'react-bootstrap';

const AppNavbar = () => (
  <Navbar bg="light" expand="lg" className="shadow-sm">
    <Container>
      <Navbar.Brand href="#home" className="fw-bold text-primary">StudentHub</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#students" active>Students</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Quick Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default AppNavbar;
