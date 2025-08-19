import React from 'react';
import { Container } from 'react-bootstrap';

const Hero = () => (
  <div className="hero-theme">
    <Container>
      <h1 className="display-4">Student Management</h1>
      <p className="lead mt-3">
        A simple interface to manage student data efficiently.
      </p>
    </Container>
  </div>
);

export default Hero;