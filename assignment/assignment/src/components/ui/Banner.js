// src/components/ui/Hero.js
import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Banner = () => {
  return (
    <>
      <Container className="pt-4">
        <Row className="align-items-center justify-content-between g-4">
          {/* Image */}
          <Col md={7}>
            <Card className="shadow-sm border rounded overflow-hidden slide-in-left">
              <Card.Img
                variant="top"
                src="http://vngt.vn/wp-content/uploads/2022/09/hang-dien-thoai.jpg"
                alt="Modern smartphone with sleek design"
              />
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="pb-5">
        <Row className="align-items-center justify-content-between g-4">
          <Col md={7}></Col>
          <Col md={5} className="slide-in-up">
            <h2 className="fw-bold mb-3">
              E-Shop – Your Smartphone Destination
            </h2>
            <p className="text-muted mb-4">
              Discover the latest smartphones with sleek designs, powerful
              performance, and unbeatable prices. We bring you the perfect
              choice for work, play, and everything in between.
            </p>
            <Button variant="dark" href="#" className="btn-animate">
              Explore the collection today ⭣
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Banner;
