import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo.jpg';
import { StyledNavbar, StyledNavLink,Brand, BrandTitle, Logo, StyledButton } from '../styles/Style';
function Header() {

  return (
    <>
      <StyledNavbar expand="lg">
        <Container fluid>
          <Brand href="#home">
            <Logo src={logoImg} alt="Healthy Recipe Finder Logo" />
            <BrandTitle>Cinemas</BrandTitle>
          </Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
            <Nav className="mx-auto" fill variant="tabs" defaultActiveKey="/home">
              <StyledNavLink href="/home">Home</StyledNavLink>
              <StyledNavLink eventKey="/free-movies">Free Movies</StyledNavLink>
              <StyledNavLink eventKey="/fav-movies">My Favourite Movies </StyledNavLink>
            </Nav>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <StyledButton style={{ textDecoration: 'none', color: 'white' }} as={Link} to="/movie-request">
                Movie Request Form
              </StyledButton>
            </div>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>

    </>
  );
}

export default Header;

