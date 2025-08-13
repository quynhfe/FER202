import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Nav, Button, Navbar, Container } from 'react-bootstrap';
import logoImg from '../assets/logo.jpg';

const Logo = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const BrandTitle = styled(Navbar.Brand)`
  color: #025331ff !important;
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const StyledNavLink = styled(Nav.Link)`
  color: #025331ff !important; 
  font-weight: 600;
  &.active {
  border-bottom: 2px solid #fc933dff !important;
}

  @media (max-width: 991px) {
    text-align: center;
    padding: 8px 0;
  }
`;

const StyledButton = styled(Button)`
  background-color: #025331ff;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;

  &:hover {
    background-color: #fc933dff;
  }
  
  @media (max-width: 991px) {
    width: 100%;
    margin-top: 10px;
  }
`;

const StyledNavbar = styled(Navbar)`
  padding: 10px 50px;
  border-bottom: 3px solid #e0e0e0;
  background-color: #ffffff;
  
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

function Header() {
  return (
    <StyledNavbar expand="lg">
      <Container fluid>
        <BrandTitle href="#home">
          <Logo src={logoImg} alt="Healthy Recipe Finder Logo" />
          <span>Healthy Recipe Finder</span>
        </BrandTitle>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto" activeKey="/recipes">
            <StyledNavLink href="/home">Home</StyledNavLink>
            <StyledNavLink href="/about">About</StyledNavLink>
            <StyledNavLink href="/recipes">Recipes</StyledNavLink>
          </Nav>
          <StyledButton>Browse Recipes</StyledButton>
        </Navbar.Collapse>
      </Container>
    </StyledNavbar>
  )
}

export default Header;