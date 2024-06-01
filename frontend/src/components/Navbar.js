import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const NavigationBar = () => {
  const { token, setToken } = useContext(AuthContext); // Extract setToken
  const navigate = useNavigate();

  const logoutClick = () => {
    setToken(null); // Set token to null
    navigate('/'); // Navigate to login page
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-lg p-3 mb-5">
      <Container>
        <Navbar.Brand as={Link} to={token ? "/home" : "/"} className="text-teal-300">SocialApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {token && (
              <>
                <Nav.Link as={Link} to="/home" className="text-white">Home</Nav.Link>
                <Nav.Link as={Link} to="/followers" className="text-white">Followers</Nav.Link>
                <Nav.Link as={Link} to="/following" className="text-white">Following</Nav.Link>
              </>
            )}
          </Nav>
          {token ? (
            <Button variant="outline-light" onClick={logoutClick} className="text-white">Logout</Button>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/" className="text-white">Login</Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-white">Register</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
