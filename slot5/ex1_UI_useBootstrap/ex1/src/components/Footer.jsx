import React from 'react';
import styled from 'styled-components';
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

const FooterContainer = styled.footer`
  // background: #2c5530;
  color: #2c5530;
  padding: 2rem 0;
  text-align: center;
  border-top: 3px solid #e0e0e0;
  display: flex;

  justify-content: space-around;
  align-items: center;
`;

const FooterText = styled.p`
  margin: 0;
  color: #2c5530;
  font-size: 1rem;
  font-weight: 400;
`;

const SocialIcons = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  margin:0 ;
  `

const Footer = () => {
  return (
    <FooterContainer>
        <FooterText>Made with ❤️ and 🥗</FooterText>
        <SocialIcons>
          <AiFillInstagram size={24} color="#2c5530" />
          <FaFacebookF size={24} color="#2c5530" />
          <FaTwitter size={24} color="#2c5530" />
        </SocialIcons>
    </FooterContainer>
  );
};

export default Footer;