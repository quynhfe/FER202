import styled from "styled-components";
import { Navbar, Nav, Button } from "react-bootstrap";
// import '../index.css';

export const Logo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;
export const HeroImage = styled.img`
  width: 100%;
  height: 500px;
  object-fit: cover;
  // border-radius: 15px;
`;

export const BrandTitle = styled.h6`
  font-weight: 600;
  font-size: 1.2rem;
  color: black;
  display: flex;
  align-items: center;
  margin: 0;
  @media (max-width: 991px) {
    font-size: 1rem;
  }
`;

export const Brand = styled(Navbar.Brand)`
  color: var(--red) !important;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

export const StyledNavLink = styled(Nav.Link)`
  color: black !important;
  font-weight: 600;
  &.active {
    // border-bottom: 2px solid black !important;
    color: var(--red) !important;
  }
  @media (max-width: 991px) {
    text-align: center;
    padding: 8px 0;
  }
`;

export const StyledButton = styled(Button)`
  background-color: black;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  &:hover {
    background-color: var(--red);
  }
  @media (max-width: 991px) {
    width: 100%;
    margin-top: 10px;
  }
`;

export const StyledNavbar = styled(Navbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px 50px 0 50px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #ffffff;
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;
