import React from 'react';
import { Container } from 'react-bootstrap';

const AppFooter = () => (
   <footer 
  className="bg-gray-500 text-center py-4 mt-auto shadow-sm border-top border-light" 
  role="contentinfo"
>
  <Container>
    <p className="text-black mb-0">
      &copy; {new Date().getFullYear()} Student Management Portal. All rights reserved.
    </p>
  </Container>
</footer>

);

export default AppFooter;
