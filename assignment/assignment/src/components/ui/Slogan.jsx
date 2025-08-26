// src/components/ui/HeroBanner.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const HeroBanner = () => {
  return (
    <div
      className="position-relative"
      style={{
        height: "50vh",
        width: "100%",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512499617640-c2f999018b72?auto=format&fit=crop&w=1920&q=80')", // ảnh nền smartphone
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      ></div>

      {/* Content */}
      <Container
        fluid
        className="position-relative h-100 px-4 px-md-5 py-5 d-flex flex-column justify-content-center"
      >
        <Row className="align-items-center justify-content-between">
          {/* Title */}
          <Col md={7}>
            <h1 className="text-white fw-bold lh-tight mb-4 display-5">
              Get everything you need for your mobile life
            </h1>
          </Col>

          {/* Text + Button */}
          <Col
            md={5}
            className="text-center text-md-end mt-4 mt-md-0"
            style={{ maxWidth: "320px" }}
          >
            <p className="text-white fs-5 mb-4">
              Find the perfect smartphone to match your style, needs, and
              performance.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroBanner;
