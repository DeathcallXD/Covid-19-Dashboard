import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Navbar, Nav } from 'react-bootstrap';
import '../css/styles.css';


function NavBar(){

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({type: 'LOGOUT', payload: {}});
    navigate('/');
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" size="lg">
      <Container>
      <Navbar.Brand href="#home">
        <img
          src={window.location.origin + '/opslyftLogo.png'}
          width="30"
          height="30"
          className="d-inline-block align-top space-right"
          alt="Logo"
        />
        Covid 19 Dashboard
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav>
          <Nav.Link href="https://opslyft.com/">About Us</Nav.Link>
          <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar;
