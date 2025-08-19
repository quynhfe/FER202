import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer
    className="text-center py-4 shadow-sm fixed-bottom"
    role="contentinfo"
    style={{
      borderTop: '4px solid var(--border-color)',
      backgroundColor: 'var(--primary-color)',
    }}
  >
    <Container>
      <p className="text-white mb-0">
        &copy; {new Date().getFullYear()} Student Management Portal. All rights reserved.
      </p>
    </Container>
  </footer>
);

export default Footer;
