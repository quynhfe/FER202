import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section mt-auto py-4">
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col md={4}>
            <p className="mb-2 mb-md-0">
              &copy; {currentYear} DishDelight. All Rights Reserved.
            </p>
          </Col>
          <Col md={4} className="text-md-center">
            <h5>DishDelight</h5>
          </Col>
          <Col md={4} className="text-md-end">
            <Nav className="justify-content-center justify-content-md-end">
              <Nav.Link
                href="https://facebook.com"
                target="_blank"
                className="text-secondary"
              >
                <FaFacebook size="1.5em" />
              </Nav.Link>
              <Nav.Link
                href="https://github.com"
                target="_blank"
                className="text-secondary"
              >
                <FaGithub size="1.5em" />
              </Nav.Link>
              <Nav.Link
                href="https://instagram.com"
                target="_blank"
                className="text-secondary"
              >
                <FaInstagram size="1.5em" />
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
