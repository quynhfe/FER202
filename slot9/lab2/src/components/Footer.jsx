// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';


const FooterStyled = styled.footer`
 background-color: #f8f9fa;
 padding: 20px 0;
 margin-top: 40px;
 text-align: center;
 font-size: 0.8rem;
 color: #6c757d;
`;


function Footer() {
 return (
 <FooterStyled>
 <Container>
 <Row>
 <Col className="text-center">
 &copy; {new Date().getFullYear()} Movie Explorer. All rights reserved.
 </Col>
 </Row>
 </Container>
 </FooterStyled>
 );
}


export default Footer;