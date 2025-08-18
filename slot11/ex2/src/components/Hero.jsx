import React from 'react';
import { Container } from 'react-bootstrap';

const Hero = () => (
  <div className="bg-white py-5 text-center">
    <Container>
      <h1 className="display-4 fw-bold text-primary">Student management</h1>
      <p className="lead text-muted mt-3">
        A simple interface to manage student data efficiently.
      </p>
    </Container>
  </div>
);

export default Hero;
